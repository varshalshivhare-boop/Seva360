/**
 * High-Performance Canvas Rendering Engine for Seva360 Frame Scrubbing
 */

export interface RenderOptions {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  image: HTMLImageElement;
  focalYRatio?: number; // 0.5 for perfect center, or custom focal shift (0.45 for temple dome)
}

/**
 * Adjusts canvas resolution for High-DPI displays and returns current CSS viewport dimensions
 */
export function setupCanvasDpi(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): { dpr: number; cssWidth: number; cssHeight: number } {
  const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance on ultra-dense screens
  const targetWidth = Math.floor(width * dpr);
  const targetHeight = Math.floor(height * dpr);

  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }

  // Ensure high quality smoothing
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';

  return { dpr, cssWidth: width, cssHeight: height };
}

/**
 * Draws an image on canvas using "cover" fitting while preserving aspect ratio and focal point
 */
export function drawImageCover({
  canvas,
  context,
  image,
  focalYRatio = 0.5
}: RenderOptions): void {
  if (!image || !image.complete || image.naturalWidth === 0) {
    return;
  }

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imgWidth = image.naturalWidth;
  const imgHeight = image.naturalHeight;

  // Calculate scaling factor to cover canvas completely
  const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
  const renderWidth = imgWidth * scale;
  const renderHeight = imgHeight * scale;

  // Center horizontally
  const renderX = (canvasWidth - renderWidth) / 2;

  // Vertically align around focal point (default center, slightly higher for temples/statues)
  // When renderHeight > canvasHeight, we want to anchor appropriately
  const diffY = canvasHeight - renderHeight;
  const renderY = diffY * focalYRatio;

  // Clear previous frame
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw current frame image
  context.drawImage(
    image,
    Math.round(renderX),
    Math.round(renderY),
    Math.round(renderWidth),
    Math.round(renderHeight)
  );
}
