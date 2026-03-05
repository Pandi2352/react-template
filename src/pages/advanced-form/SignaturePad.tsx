import { useRef, useState, useEffect, useCallback } from 'react';
import { Eraser } from 'lucide-react';
import { Button } from '@/components/common';

interface Props {
  value: string;
  onChange: (dataUrl: string) => void;
  error?: string;
}

export function SignaturePad({ value, onChange, error }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const getCtx = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    return ctx;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    if (value) {
      const img = new Image();
      img.onload = () => getCtx()?.drawImage(img, 0, 0);
      img.src = value;
    }
  }, []);

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    const ctx = getCtx();
    if (!ctx) return;
    setIsDrawing(true);
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = getCtx();
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function endDraw() {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) onChange(canvas.toDataURL());
  }

  function clear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange('');
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="mb-1 block text-sm font-semibold text-gray-800">
          Signature <span className="text-error">*</span>
        </label>
        <Button type="button" size="sm" variant="ghost" onClick={clear}>
          <Eraser className="mr-1 h-3.5 w-3.5" /> Clear
        </Button>
      </div>
      <div className={`overflow-hidden rounded-lg border-2 ${error ? 'border-error' : 'border-gray-300'}`}>
        <canvas
          ref={canvasRef}
          className="h-32 w-full cursor-crosshair bg-white touch-none"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>
      <p className="mt-1 text-xs text-gray-400">Draw your signature above using mouse or touch</p>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}
