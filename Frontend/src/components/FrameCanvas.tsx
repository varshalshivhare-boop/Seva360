import React, { useEffect, useRef, useCallback } from 'react';
import {
  getFrame,
  prioritizeWindow,
  VID1_FRAME_COUNT,
  VID2_FRAME_COUNT
} from '../utils/frameLoader';
import { setupCanvasDpi, drawImageCover } from '../utils/canvasRenderer';

interface FrameCanvasProps {
  progressRef: React.MutableRefObject<number>;
}

export const FrameCanvas: React.FC<FrameCanvasProps> = ({ progressRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentRenderedKeyRef = useRef<string>('');
  const smoothedProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Compute current sequence and frame index from normalized progress (0 -> 1)
  const getSequenceAndFrame = useCallback((progress: number): { sequence: 1 | 2; frameIndex: number } => {
    // 0.00 to 0.48: Sequence 1 (Vid1, 1..240)
    // 0.48 to 0.90: Sequence 2 (Vid2, 1..240)
    // 0.90 to 1.00: Hold at Sequence 2, Frame 240 (Full Darshan)
    if (progress < 0.48) {
      const p1 = Math.max(0, Math.min(1, progress / 0.48));
      const frameIndex = Math.round(1 + p1 * (VID1_FRAME_COUNT - 1));
      return { sequence: 1, frameIndex: Math.max(1, Math.min(VID1_FRAME_COUNT, frameIndex)) };
    } else if (progress < 0.90) {
      const p2 = Math.max(0, Math.min(1, (progress - 0.48) / 0.42));
      const frameIndex = Math.round(1 + p2 * (VID2_FRAME_COUNT - 1));
      return { sequence: 2, frameIndex: Math.max(1, Math.min(VID2_FRAME_COUNT, frameIndex)) };
    } else {
      return { sequence: 2, frameIndex: VID2_FRAME_COUNT };
    }
  }, []);

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Smooth progress with lightweight lerp for cinematic fluidity
    const targetProgress = progressRef.current;
    const diff = targetProgress - smoothedProgressRef.current;

    // If difference is tiny, snap to target
    if (Math.abs(diff) < 0.0001) {
      smoothedProgressRef.current = targetProgress;
    } else {
      smoothedProgressRef.current += diff * 0.22;
    }

    const { sequence, frameIndex } = getSequenceAndFrame(smoothedProgressRef.current);
    const key = `v${sequence}_${frameIndex}`;

    // Ensure canvas dimensions match viewport DPI
    setupCanvasDpi(canvas, ctx, window.innerWidth, window.innerHeight);

    // Prioritize surrounding frames
    prioritizeWindow(sequence, frameIndex, 25);

    // Retrieve cached image (or closest available fallback)
    const img = getFrame(sequence, frameIndex);

    if (img && img.complete && img.naturalWidth > 0) {
      drawImageCover({
        canvas,
        context: ctx,
        image: img,
        // Keep deity & temple entrance visually anchored
        focalYRatio: sequence === 1 ? 0.46 : 0.42
      });
      currentRenderedKeyRef.current = key;
    }

    rafIdRef.current = requestAnimationFrame(renderFrame);
  }, [getSequenceAndFrame, progressRef]);

  useEffect(() => {
    rafIdRef.current = requestAnimationFrame(renderFrame);

    const handleResize = () => {
      currentRenderedKeyRef.current = ''; // Force redraw on resize
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [renderFrame]);

  return <canvas ref={canvasRef} className="cinematic-canvas" />;
};
