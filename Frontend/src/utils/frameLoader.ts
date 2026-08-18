/**
 * Frame Loader and Caching Engine for Seva360 Cinematic Experience
 */

export const VID1_FRAME_COUNT = 240;
export const VID2_FRAME_COUNT = 240;
export const TOTAL_FRAMES = VID1_FRAME_COUNT + VID2_FRAME_COUNT;

// Cache map storing loaded HTMLImageElement instances keyed by "vid{seq}_{index}"
const imageCache = new Map<string, HTMLImageElement>();
const loadingPromises = new Map<string, Promise<HTMLImageElement>>();

export function getFramePath(sequence: 1 | 2, index: number): string {
  const clampedIndex = Math.max(1, Math.min(index, sequence === 1 ? VID1_FRAME_COUNT : VID2_FRAME_COUNT));
  const paddedIndex = String(clampedIndex).padStart(3, '0');
  return `/Vid${sequence}/ezgif-frame-${paddedIndex}.jpg`;
}

export function getFrameKey(sequence: 1 | 2, index: number): string {
  return `v${sequence}_${index}`;
}

export function isFrameLoaded(sequence: 1 | 2, index: number): boolean {
  const key = getFrameKey(sequence, index);
  const img = imageCache.get(key);
  return !!(img && img.complete && img.naturalWidth > 0);
}

/**
 * Loads a single frame image and caches it
 */
export function loadFrame(sequence: 1 | 2, index: number): Promise<HTMLImageElement> {
  const key = getFrameKey(sequence, index);

  if (imageCache.has(key)) {
    const existing = imageCache.get(key)!;
    if (existing.complete && existing.naturalWidth > 0) {
      return Promise.resolve(existing);
    }
  }

  if (loadingPromises.has(key)) {
    return loadingPromises.get(key)!;
  }

  const promise = new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = getFramePath(sequence, index);

    img.onload = () => {
      imageCache.set(key, img);
      loadingPromises.delete(key);
      resolve(img);
    };

    img.onerror = (err) => {
      loadingPromises.delete(key);
      console.warn(`[FrameLoader] Failed to load frame: Vid${sequence} #${index}`, err);
      // Fallback: don't permanently reject to avoid breaking promises
      resolve(img);
    };
  });

  loadingPromises.set(key, promise);
  return promise;
}

/**
 * Retrieve cached image synchronously.
 * If exact frame is not yet ready, finds the closest loaded frame in the same sequence
 * to guarantee no blank canvas or flashing occurs.
 */
export function getFrame(sequence: 1 | 2, index: number): HTMLImageElement | null {
  const exactKey = getFrameKey(sequence, index);
  const exact = imageCache.get(exactKey);
  if (exact && exact.complete && exact.naturalWidth > 0) {
    return exact;
  }

  // Find closest loaded frame in the current sequence
  const maxFrames = sequence === 1 ? VID1_FRAME_COUNT : VID2_FRAME_COUNT;
  for (let offset = 1; offset <= maxFrames; offset++) {
    const lower = index - offset;
    const higher = index + offset;

    if (lower >= 1) {
      const img = imageCache.get(getFrameKey(sequence, lower));
      if (img && img.complete && img.naturalWidth > 0) return img;
    }
    if (higher <= maxFrames) {
      const img = imageCache.get(getFrameKey(sequence, higher));
      if (img && img.complete && img.naturalWidth > 0) return img;
    }
  }

  // Fallback: If transitioning sequences, check end/start of other sequence
  if (sequence === 2) {
    const endVid1 = imageCache.get(getFrameKey(1, VID1_FRAME_COUNT));
    if (endVid1 && endVid1.complete) return endVid1;
  } else {
    const startVid2 = imageCache.get(getFrameKey(2, 1));
    if (startVid2 && startVid2.complete) return startVid2;
  }

  return null;
}

/**
 * Preloads the essential initial frames to ensure a smooth immediate launch
 */
export async function preloadInitialBuffer(
  onProgress?: (loadedCount: number, targetCount: number, percent: number) => void
): Promise<void> {
  const initialBatch: { seq: 1 | 2; idx: number }[] = [];

  // 1. Initial 20 frames of Vid1 (smooth start)
  for (let i = 1; i <= 20; i++) {
    initialBatch.push({ seq: 1, idx: i });
  }

  // 2. Transition frames (Vid1 end and Vid2 start)
  for (let i = VID1_FRAME_COUNT - 5; i <= VID1_FRAME_COUNT; i++) {
    initialBatch.push({ seq: 1, idx: i });
  }
  for (let i = 1; i <= 10; i++) {
    initialBatch.push({ seq: 2, idx: i });
  }

  // 3. Final Darshan frames (Vid2 end)
  for (let i = VID2_FRAME_COUNT - 5; i <= VID2_FRAME_COUNT; i++) {
    initialBatch.push({ seq: 2, idx: i });
  }

  const targetCount = initialBatch.length;
  let loadedCount = 0;

  const loadPromises = initialBatch.map(async ({ seq, idx }) => {
    try {
      await loadFrame(seq, idx);
    } catch {
      // ignore individual failures
    } finally {
      loadedCount++;
      if (onProgress) {
        onProgress(loadedCount, targetCount, Math.round((loadedCount / targetCount) * 100));
      }
    }
  });

  await Promise.all(loadPromises);

  // Kick off background progressive loader for remaining frames without blocking
  startBackgroundPreload();
}

let backgroundPreloadStarted = false;

/**
 * Progressively loads remaining frames in order of likelihood of user scrub
 */
export function startBackgroundPreload(): void {
  if (backgroundPreloadStarted) return;
  backgroundPreloadStarted = true;

  const queue: { seq: 1 | 2; idx: number }[] = [];

  // Vid1 sequence in order
  for (let i = 1; i <= VID1_FRAME_COUNT; i++) {
    if (!imageCache.has(getFrameKey(1, i))) {
      queue.push({ seq: 1, idx: i });
    }
  }

  // Vid2 sequence in order
  for (let i = 1; i <= VID2_FRAME_COUNT; i++) {
    if (!imageCache.has(getFrameKey(2, i))) {
      queue.push({ seq: 2, idx: i });
    }
  }

  // Load with controlled concurrency (e.g. 6 concurrent requests)
  const CONCURRENCY = 6;
  let cursor = 0;

  function processNext(): void {
    if (cursor >= queue.length) return;
    const item = queue[cursor++];
    loadFrame(item.seq, item.idx).finally(() => {
      // schedule next in requestIdleCallback or microtask
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(() => processNext(), { timeout: 200 });
      } else {
        setTimeout(processNext, 10);
      }
    });
  }

  for (let c = 0; c < CONCURRENCY; c++) {
    processNext();
  }
}

/**
 * When the user scrolls to a specific position, prioritize surrounding frames immediately
 */
export function prioritizeWindow(sequence: 1 | 2, currentIndex: number, radius = 25): void {
  const max = sequence === 1 ? VID1_FRAME_COUNT : VID2_FRAME_COUNT;
  const start = Math.max(1, currentIndex - radius);
  const end = Math.min(max, currentIndex + radius);

  for (let i = start; i <= end; i++) {
    if (!imageCache.has(getFrameKey(sequence, i))) {
      loadFrame(sequence, i);
    }
  }
}
