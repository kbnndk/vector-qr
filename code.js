/*
 * Vector QR 0.1 — Figma document controller.
 * QR generation, preview and export live in ui.html.
 * This controller only sizes the window and inserts vector layers on request.
 */

figma.showUI(__html__, {
  width: 480,
  height: 800,
  themeColors: false
});

const windowSize = { width: 480, height: 800 };
const MIN_SIZE = 128;
const MAX_SIZE = 3000;

function isSafeSvg(svg) {
  return typeof svg === 'string'
    && svg.length <= 1200000
    && /^<svg[\s>]/.test(svg)
    && !/<(?:script|foreignObject|iframe|object|embed)\b/i.test(svg)
    && !/\bon\w+\s*=/i.test(svg)
    && !/\b(?:href|src)\s*=\s*["'](?:https?:|javascript:|data:)/i.test(svg);
}

function hexToRgb(hex) {
  if (typeof hex !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error('Некорректный цвет фона.');
  }
  return {
    r: parseInt(hex.slice(1, 3), 16) / 255,
    g: parseInt(hex.slice(3, 5), 16) / 255,
    b: parseInt(hex.slice(5, 7), 16) / 255
  };
}

function resizeWindow(message) {
  const width = Math.max(300, Math.min(480, Math.round(Number(message.width) || 480)));
  const height = Math.max(400, Math.min(1334, Math.round(Number(message.height) || 800)));
  if (width === windowSize.width && height === windowSize.height) return;

  try {
    figma.ui.resize(width, height);
    windowSize.width = width;
    windowSize.height = height;
  } catch (error) {
    // Figma can restrict resizing; ui.html still scales within the current window.
  }
}

function createBackground(frame, size, color) {
  const background = figma.createRectangle();
  frame.appendChild(background);
  background.name = 'Фон QR · можно скрыть или удалить';
  background.resize(size, size);
  background.x = 0;
  background.y = 0;
  background.fills = [{ type: 'SOLID', color: color }];
  background.strokes = [];
}

// Enforce the foreground on imported Figma vectors as well as in SVG markup.
// Figma can resolve <use>, CSS and inherited fills differently from Chromium.
// Preserve white counter-shapes and transparent paints.
function ensureForeground(node, foreground) {
  function recolor(paints) {
    if (!Array.isArray(paints)) return null;
    let changed = false;
    const result = paints.map(paint => {
      if (paint.type !== 'SOLID' || paint.visible === false || paint.opacity === 0 || !paint.color) return paint;
      const color = paint.color;
      const white = color.r >= 0.96 && color.g >= 0.96 && color.b >= 0.96;
      const same = Math.abs(color.r - foreground.r) < 0.001
        && Math.abs(color.g - foreground.g) < 0.001
        && Math.abs(color.b - foreground.b) < 0.001;
      if (white || same) return paint;
      changed = true;
      return { ...paint, color: foreground };
    });
    return changed ? result : null;
  }

  function visit(item) {
    if ('fills' in item) {
      const fills = recolor(item.fills);
      if (fills) item.fills = fills;
    }
    if ('strokes' in item) {
      const strokes = recolor(item.strokes);
      if (strokes) item.strokes = strokes;
    }
    if ('children' in item) for (const child of item.children) visit(child);
  }
  visit(node);
}

function insertQr(message) {
  let frame = null;
  try {
    if (!isSafeSvg(message.svg)) throw new Error('SVG содержит недопустимые элементы.');

    const size = Number(message.size);
    if (!Number.isFinite(size) || size < MIN_SIZE || size > MAX_SIZE) {
      throw new Error('Недопустимый размер QR.');
    }

    // Validate before changing the document; an optional background is a native rectangle.
    const backgroundColor = message.background == null ? null : hexToRgb(message.background);
    const foregroundColor = message.foreground == null ? null : hexToRgb(message.foreground);

    frame = figma.createFrame();
    const mode = message.mode === 'logo' ? 'Логотип' : message.mode === 'hole' ? 'Отверстие' : 'QR';
    frame.name = 'Vector QR · ' + mode;
    frame.resize(size, size);
    frame.fills = [];
    frame.strokes = [];
    frame.clipsContent = false;
    frame.x = Math.round(figma.viewport.center.x - size / 2);
    frame.y = Math.round(figma.viewport.center.y - size / 2);

    if (backgroundColor) createBackground(frame, size, backgroundColor);

    const vector = figma.createNodeFromSvg(message.svg);
    frame.appendChild(vector);
    if (foregroundColor) ensureForeground(vector, foregroundColor);
    vector.name = 'QR-код · вектор · без фона';
    vector.x = 0;
    vector.y = 0;
    vector.resize(size, size);

    figma.currentPage.selection = [frame];
    figma.viewport.scrollAndZoomIntoView([frame]);
    figma.ui.postMessage({ type: 'inserted' });
  } catch (error) {
    // Leave no partial objects in the document if SVG import fails.
    if (frame) frame.remove();
    figma.ui.postMessage({
      type: 'error',
      message: error && error.message ? error.message : String(error)
    });
  }
}

figma.ui.onmessage = function (message) {
  if (!message || typeof message !== 'object') return;
  if (message.type === 'adapt-size') resizeWindow(message);
  if (message.type === 'insert') insertQr(message);
};
