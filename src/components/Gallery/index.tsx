import React, { useState, useCallback, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import galleryData from '@site/src/data/gallery.json';
import styles from './styles.module.css';

interface GalleryImage {
  src: string;
  alt: string;
  tags: string[];
  caption: string;
}

const MAX_PREVIEW = 12; // Photos in the homepage scroller

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

  // ── scroller state ──
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    updateScroll();
    window.addEventListener('resize', updateScroll);
    return () => window.removeEventListener('resize', updateScroll);
  }, [updateScroll]);

  const scrollByPage = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  }, []);

  const currentImage = lightboxIndex !== null ? images[lightboxIndex] : null;
  // Call useBaseUrl unconditionally. Calling it inside {currentImage && ...}
  // would violate Rules of Hooks and trigger React error #310.
  const lightboxSrc = useBaseUrl(currentImage?.src ?? '/');

  return (
    <section className={styles.section} id="gallery">
      <div className={styles.container}>
        <div className="section-header">
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">
            Real photos of the place. A few were taken mid-party.
          </p>
        </div>

      </div>

      {/* one full-width row of photos, scrolled sideways */}
      <div
        ref={trackRef}
        className={styles.track}
        onScroll={updateScroll}
        tabIndex={0}
        role="region"
        aria-label="Photos of The Fellowship. Scroll sideways or use the arrow buttons."
      >
        {images.map((image, index) => (
          <GalleryThumb
            key={image.src}
            image={image}
            number={index + 1}
            onClick={() => openLightbox(index)}
          />
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.progress} aria-hidden="true">
            <span style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }} />
          </div>
          <div className={styles.arrows}>
            <button
              className={styles.arrow}
              onClick={() => scrollByPage(-1)}
              disabled={atStart}
              aria-label="Scroll photos back"
            >
              &#8592;
            </button>
            <button
              className={styles.arrow}
              onClick={() => scrollByPage(1)}
              disabled={atEnd}
              aria-label="Scroll photos forward"
            >
              &#8594;
            </button>
          </div>
          {galleryData.length > MAX_PREVIEW && (
            <Link to="/gallery" className="btn btn-secondary">
              See all {galleryData.length} photos
            </Link>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentImage && (
        <div
          className="atlas-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            className="atlas-lightbox__btn atlas-lightbox__btn--close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              className="atlas-lightbox__btn atlas-lightbox__btn--prev"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous image"
            >
              &#8249;
            </button>
          )}

          <div
            className="atlas-lightbox__figure"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxSrc}
              alt={currentImage.alt}

            />
            <p className="atlas-lightbox__caption">{currentImage.caption}</p>
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              className="atlas-lightbox__btn atlas-lightbox__btn--next"
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

function GalleryThumb({
  image,
  number,
  onClick,
}: {
  image: GalleryImage;
  number: number;
  onClick: () => void;
}) {
  return (
    <button
      className={clsx('atlas-figure', styles.slide)}
      onClick={onClick}
      aria-label={`View ${image.caption}`}
    >
      <span className="atlas-figure__frame">
        <img src={useBaseUrl(image.src)} alt={image.alt} loading="lazy" />
      </span>
      <span className="atlas-figure__caption">
        <span aria-hidden="true">{String(number).padStart(2, '0')}</span>
        {image.caption}
      </span>
    </button>
  );
}
