import { useState, useEffect } from 'react';

interface GalleryItemProps {
  before: string;
  after: string;
  index: number;
}

export default function GalleryItem({ before, after, index }: GalleryItemProps) {
  const [showAfter, setShowAfter] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia('(hover: none)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  const handleClick = () => {
    if (isTouchDevice) {
      setShowAfter(!showAfter);
      setHasInteracted(true);
    }
  };

  return (
    <div
      className="group relative aspect-square rounded-2xl overflow-hidden bg-white/5 cursor-pointer"
      onClick={handleClick}
    >
      {/* Before Image */}
      <img
        src={before}
        alt={`Example ${index + 1} before`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500
          ${isTouchDevice
            ? (showAfter ? 'opacity-0' : 'opacity-100')
            : 'group-hover:opacity-0'
          }`}
        draggable={false}
      />

      {/* After Image */}
      <img
        src={after}
        alt={`Example ${index + 1} after`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500
          ${isTouchDevice
            ? (showAfter ? 'opacity-100' : 'opacity-0')
            : 'opacity-0 group-hover:opacity-100'
          }`}
        draggable={false}
      />

      {/* Hint text */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <span
          className={`px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm text-white/80 transition-opacity
            ${isTouchDevice
              ? (hasInteracted ? 'opacity-0' : 'opacity-100')
              : 'group-hover:opacity-0'
            }`}
        >
          {isTouchDevice ? 'Tap to see tattoo' : 'Hover to see tattoo'}
        </span>
      </div>
    </div>
  );
}
