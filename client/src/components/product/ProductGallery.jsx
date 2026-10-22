import React, { useState } from 'react';

export default function ProductGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:w-20 flex-shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`w-16 h-20 md:w-full md:h-24 border ${
              selectedImage === img ? 'border-brandBlack border-2' : 'border-neutral-200'
            } overflow-hidden bg-neutral-100 flex-shrink-0`}
          >
            <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Preview */}
      <div className="flex-1 aspect-[3/4] bg-neutral-100 overflow-hidden border border-neutral-200">
        <img
          src={selectedImage || images[0]}
          alt="Main Product"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}