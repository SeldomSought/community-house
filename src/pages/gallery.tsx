import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import galleryData from '@site/src/data/gallery.json';

interface GalleryImage {
  src: string;
  alt: string;
  tags: string[];
  caption: string;
}

const ALL_TAG = 'All';

function useGalleryImages(): GalleryImage[] {
  return galleryData as GalleryImage[];
}

export default function GalleryPage(): JSX.Element {
  const images = useGalleryImages();
  const [activeTag, setActiveTag] = useState(ALL_TAG);
  const [search, setSearch] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Derive unique tags
  const tags = useMemo(() => {
    const set = new Set<string>();
    images.forEach((img) => img.tags.forEach((t) => set.add(t)));
    return [ALL_TAG, ...Array.from(set).sort()];
  }, [images]);

  // Filter images
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return images.filter((img) => {
      const matchesTag = activeTag === ALL_TAG || img.tags.includes(activeTag);
      const matchesSearch =
        !q ||
        img.caption.toLowerCase().includes(q) ||
        img.alt.toLowerCase().includes(q);
      return matchesTag && matchesSearch;
    });
  }, [images, activeTag, search]);

  // Lightbox controls
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + filtered.length) % filtered.length : null,
    );
  }, [filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  const currentImage = lightboxIndex !== null ? filtered[lightboxIndex] : null;
  // Call useBaseUrl unconditionally. Calling it inside {currentImage && ...}
  // would violate Rules of Hooks and trigger React error #310.
  const lightboxSrc = useBaseUrl(currentImage?.src ?? '/');

  return (
    <Layout title="Gallery" description="Photos of the houses, the yard, and the people who live at The Fellowship.">
      <main className="gallery-page">
        <div className="gallery-page__inner">
          {/* Header */}
          <div className="gallery-page__header section-header">
            <h1>Gallery</h1>
            <p>Real photos of the place. A few were taken mid-party.</p>
          </div>

          {/* Filters + Search */}
          <div className="gallery-page__tools">
            {tags.map((tag) => (
              <button
                key={tag}
                className="gallery-tag"
                aria-pressed={activeTag === tag}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
            <input
              type="search"
              className="gallery-search"
              placeholder="Search photos..."
              aria-label="Search photos"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p className="gallery-page__empty">No images match your filters.</p>
          ) : (
            <div className="gallery-page__grid">
              {filtered.map((image, index) => (
                <GalleryThumbnail
                  key={image.src}
                  image={image}
                  number={index + 1}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Lightbox */}
        {currentImage && (
          <div
            className="atlas-lightbox"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close */}
            <button
              className="atlas-lightbox__btn atlas-lightbox__btn--close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              &#x2715;
            </button>

            {/* Prev */}
            {filtered.length > 1 && (
              <button
                className="atlas-lightbox__btn atlas-lightbox__btn--prev"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                aria-label="Previous image"
              >
                &#8249;
              </button>
            )}

            {/* Image */}
            <div className="atlas-lightbox__figure" onClick={(e) => e.stopPropagation()}>
              <img src={lightboxSrc} alt={currentImage.alt} />
              <p className="atlas-lightbox__caption">
                {currentImage.caption}
                <span className="atlas-lightbox__count">
                  {lightboxIndex! + 1} / {filtered.length}
                </span>
              </p>
            </div>

            {/* Next */}
            {filtered.length > 1 && (
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
      </main>
    </Layout>
  );
}

/* ── Thumbnail sub-component ── */

function GalleryThumbnail({
  image,
  number,
  onClick,
}: {
  image: GalleryImage;
  number: number;
  onClick: () => void;
}) {
  const src = useBaseUrl(image.src);
  return (
    <button className="atlas-figure" onClick={onClick} aria-label={`View ${image.caption}`}>
      <span className="atlas-figure__frame">
        <img src={src} alt={image.alt} loading="lazy" />
      </span>
      <span className="atlas-figure__caption">
        <span aria-hidden="true">{String(number).padStart(2, '0')}</span>
        {image.caption}
      </span>
    </button>
  );
}
