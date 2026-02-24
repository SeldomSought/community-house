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

  return (
    <Layout title="Gallery" description="Photos from The Fellowship community">
      <main style={{ padding: 'var(--section-padding, 4rem) 0' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 2.5rem' }}>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw + 0.5rem, 3rem)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              marginBottom: '0.75rem',
            }}>
              Gallery
            </h1>
            <p style={{
              fontSize: '1.0625rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              margin: 0,
            }}>
              A glimpse of life at The Fellowship.
            </p>
          </div>

          {/* Filters + Search */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full, 9999px)',
                  border: activeTag === tag ? '1px solid var(--color-brand)' : '1px solid var(--color-border-strong)',
                  background: activeTag === tag ? 'var(--color-brand)' : 'transparent',
                  color: activeTag === tag ? '#fff' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.15s ease',
                }}
              >
                {tag}
              </button>
            ))}
            <input
              type="search"
              placeholder="Search photos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full, 9999px)',
                border: '1px solid var(--color-border-strong)',
                background: 'var(--color-surface-elevated)',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-body)',
                minWidth: '180px',
                outline: 'none',
              }}
            />
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '3rem 0' }}>
              No images match your filters.
            </p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
              gap: '1.25rem',
            }}>
              {filtered.map((image, index) => (
                <GalleryThumbnail
                  key={image.src}
                  image={image}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Lightbox */}
        {currentImage && (
          <div
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0, 0, 0, 0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              animation: 'galleryFadeIn 0.2s ease',
            }}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              aria-label="Close lightbox"
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.5rem',
              }}
            >
              &#x2715;
            </button>

            {/* Prev */}
            {filtered.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                aria-label="Previous image"
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                }}
              >
                &#8249;
              </button>
            )}

            {/* Image */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={useBaseUrl(currentImage.src)}
                alt={currentImage.alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '78vh',
                  objectFit: 'contain',
                  borderRadius: '0.5rem',
                }}
              />
              <p style={{
                marginTop: '1rem',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '1rem',
                textAlign: 'center',
              }}>
                {currentImage.caption}
                <span style={{ marginLeft: '1rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                  {lightboxIndex! + 1} / {filtered.length}
                </span>
              </p>
            </div>

            {/* Next */}
            {filtered.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                aria-label="Next image"
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                }}
              >
                &#8250;
              </button>
            )}
          </div>
        )}

        {/* Inline keyframes for lightbox fade-in */}
        <style>{`
          @keyframes galleryFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </main>
    </Layout>
  );
}

/* ── Thumbnail sub-component ── */

function GalleryThumbnail({
  image,
  onClick,
}: {
  image: GalleryImage;
  onClick: () => void;
}) {
  const src = useBaseUrl(image.src);
  return (
    <button
      onClick={onClick}
      aria-label={`View ${image.caption}`}
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        padding: 0,
        border: 'none',
        background: 'var(--color-surface-muted)',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: '0.5rem',
        aspectRatio: '4 / 3',
      }}
    >
      <img
        src={src}
        alt={image.alt}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.3s ease',
        }}
        onMouseOver={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.05)'; }}
        onMouseOut={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 50%, rgba(45,45,42,0.7) 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '1rem',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
        onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
        onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0'; }}
      >
        <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>
          {image.caption}
        </span>
      </div>
    </button>
  );
}
