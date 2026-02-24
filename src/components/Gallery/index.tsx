import React, { useState, useCallback, useEffect } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import galleryData from '@site/src/data/gallery.json';
import styles from './styles.module.css';

interface GalleryImage {
  src: string;
  alt: string;
  tags: string[];
  caption: string;
}

const MAX_PREVIEW = 8; // Show at most 8 on homepage

export default function Gallery(): JSX.Element {
  const images = (galleryData as GalleryImage[]).slice(0, MAX_PREVIEW);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + images.length) % images.length : null,
    );
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  const currentImage = lightboxIndex !== null ? images[lightboxIndex] : null;
  // useBaseUrl is a hook — call unconditionally to avoid Rules of Hooks violation
  const lightboxSrc = useBaseUrl(currentImage?.src ?? '/');

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
          {images.map((image, index) => (
            <GalleryThumb
              key={image.src}
              image={image}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>

        {galleryData.length > MAX_PREVIEW && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/gallery" className="btn btn-secondary">
              View all photos
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {currentImage && (
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              className={styles.navButton}
              style={{ left: '1rem' }}
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous image"
            >
              &#8249;
            </button>
          )}

          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxSrc}
              alt={currentImage.alt}
              className={styles.lightboxImage}
            />
            <p className={styles.lightboxCaption}>{currentImage.caption}</p>
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              className={styles.navButton}
              style={{ right: '1rem' }}
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next image"
            >
              &#8250;
            </button>
          )}
        </div>
      )}
    </section>
  );
}

function GalleryThumb({ image, onClick }: { image: GalleryImage; onClick: () => void }) {
  return (
    <button
      className={styles.imageButton}
      onClick={onClick}
      aria-label={`View ${image.caption}`}
    >
      <img
        src={useBaseUrl(image.src)}
        alt={image.alt}
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.imageOverlay}>
        <span className={styles.imageTitle}>{image.caption}</span>
      </div>
    </button>
  );
}
