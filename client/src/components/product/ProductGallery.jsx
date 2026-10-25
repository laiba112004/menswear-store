import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductGallery({ images = [], title = "Product Image" }) {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    setSelectedImage(images[0] || '');
  }, [images]);

  const activeImg = selectedImage || images[0] || '';

  const openLightbox = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-4">
        {/* Thumbnails list */}
        <div className="flex md:flex-col gap-3 overflow-x-auto md:w-20 flex-shrink-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`w-16 h-20 md:w-full md:h-24 border transition-all ${
                activeImg === img ? 'border-brandBlack border-2 shadow-sm' : 'border-neutral-200 opacity-70 hover:opacity-100'
              } overflow-hidden bg-neutral-100 flex-shrink-0`}
              aria-label={`View Image Thumbnail ${idx + 1}`}
            >
              <img src={img} alt={`${title} Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Main Preview with Hover Zoom & Lightbox Trigger (FR-P01) */}
        <div className="relative flex-1 aspect-[3/4] bg-neutral-100 overflow-hidden border border-neutral-200 group">
          <img
            src={activeImg}
            alt={`${title} High Resolution View`}
            onClick={() => openLightbox(images.indexOf(activeImg) >= 0 ? images.indexOf(activeImg) : 0)}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
          />

          <button
            onClick={() => openLightbox(images.indexOf(activeImg) >= 0 ? images.indexOf(activeImg) : 0)}
            className="absolute top-3 right-3 p-2 bg-brandBlack/70 hover:bg-black text-white rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            title="Expand Lightbox"
            aria-label="Open Fullscreen Gallery Lightbox"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal (FR-P01) */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fadeIn">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-50"
            aria-label="Close Lightbox"
          >
            <X size={28} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={prevLightbox}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                aria-label="Previous Image"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={nextLightbox}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                aria-label="Next Image"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <div className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col items-center">
            <img
              src={images[lightboxIndex]}
              alt={`${title} Fullscreen Look ${lightboxIndex + 1}`}
              className="max-h-[80vh] w-auto object-contain select-none shadow-2xl"
            />
            <p className="text-white/60 text-xs uppercase tracking-widest mt-4">
              {lightboxIndex + 1} of {images.length} • {title}
            </p>
          </div>
        </div>
      )}
    </>
  );
}