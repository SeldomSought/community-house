import React, { useState, useCallback, useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: '/img/home/hero-banner.png',
    alt: 'The Fellowship property exterior view',
    title: 'Property Exterior',
  },
  {
    src: '/img/home/aerial-view.webp',
    alt: 'Aerial view of the three houses',
    title: 'Aerial View',
  },
  {
    src: '/img/home/hero-banner.png',
    alt: 'Community gathering space',
    title: 'Community Space',
  },
  {
    src: '/img/home/aerial-view.webp',
    alt: 'Property grounds and outdoor areas',
    title: 'Outdoor Areas',
  },
];

export default function Gallery(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openLightbox = useCallback((image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeLightbox();
      }
    };

    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImage, closeLightbox]);

  return (
    <section className={styles.section} id="gallery">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Gallery</h2>
          <p className={styles.subtitle}>
            A glimpse of life at The Fellowship.
          </p>
        </div>

        <div className={styles.grid}>
          {galleryImages.map((image, index) => (
            <button
              key={index}
              className={styles.imageButton}
              onClick={() => openLightbox(image)}
              aria-label={`View ${image.title}`}
            >
              <img
                src={useBaseUrl(image.src)}
                alt={image.alt}
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.imageOverlay}>
                <span className={styles.imageTitle}>{image.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            className={styles.closeButton}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={useBaseUrl(selectedImage.src)}
              alt={selectedImage.alt}
              className={styles.lightboxImage}
            />
            <p className={styles.lightboxCaption}>{selectedImage.title}</p>
          </div>
        </div>
      )}
    </section>
  );
}
