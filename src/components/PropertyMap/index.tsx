import React, { useState, useCallback, useRef } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

interface HouseFeature {
  name: string;
  icon: string;
}

interface HouseData {
  id: string;
  name: string;
  features: HouseFeature[];
  position: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
}

const houses: HouseData[] = [
  {
    id: 'left',
    name: 'West House',
    features: [
      { name: 'Conservatory', icon: '🌿' },
      { name: 'Hot Tub', icon: '♨️' },
      { name: 'Guest Loft', icon: '🛏️' },
      { name: 'Theatre Room', icon: '🎬' },
    ],
    position: {
      top: '25%',
      left: '5%',
      width: '28%',
      height: '50%',
    },
  },
  {
    id: 'center',
    name: 'Main House',
    features: [
      { name: 'Outdoor Propane Grill', icon: '🔥' },
      { name: 'Fire Pit', icon: '🪵' },
      { name: 'Backyard Chickens', icon: '🐔' },
      { name: 'Coworking Space', icon: '💻' },
    ],
    position: {
      top: '20%',
      left: '33%',
      width: '34%',
      height: '55%',
    },
  },
  {
    id: 'right',
    name: 'East House',
    features: [
      { name: 'Barbell Gym', icon: '🏋️' },
      { name: 'Plunge Cold Plunge', icon: '🧊' },
    ],
    position: {
      top: '25%',
      left: '67%',
      width: '28%',
      height: '50%',
    },
  },
];

export default function PropertyMap(): JSX.Element {
  const [activeHouse, setActiveHouse] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultImageUrl = useBaseUrl('/img/home/aerial-view.png');

  // Use custom image if uploaded, otherwise default
  const imageUrl = customImage || defaultImageUrl;

  // Detect mobile on mount
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleHouseInteraction = useCallback((houseId: string) => {
    if (isMobile) {
      // Toggle on mobile
      setActiveHouse(prev => prev === houseId ? null : houseId);
    }
  }, [isMobile]);

  const handleMouseEnter = useCallback((houseId: string) => {
    if (!isMobile) {
      setActiveHouse(houseId);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setActiveHouse(null);
    }
  }, [isMobile]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, houseId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveHouse(prev => prev === houseId ? null : houseId);
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      // Revoke previous object URL to prevent memory leaks
      if (customImage) {
        URL.revokeObjectURL(customImage);
      }
      const previewUrl = URL.createObjectURL(file);
      setCustomImage(previewUrl);
    }
  }, [customImage]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleResetImage = useCallback(() => {
    if (customImage) {
      URL.revokeObjectURL(customImage);
    }
    setCustomImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [customImage]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mapContainer}>
        <img
          src={imageUrl}
          alt="Aerial view of The Fellowship property showing three houses"
          className={styles.aerialImage}
          loading="lazy"
        />

        {/* Interactive overlay zones */}
        <div className={styles.overlay}>
          {houses.map((house) => (
            <div
              key={house.id}
              className={`${styles.houseZone} ${activeHouse === house.id ? styles.active : ''}`}
              style={{
                top: house.position.top,
                left: house.position.left,
                width: house.position.width,
                height: house.position.height,
              }}
              onClick={() => handleHouseInteraction(house.id)}
              onMouseEnter={() => handleMouseEnter(house.id)}
              onMouseLeave={handleMouseLeave}
              onKeyDown={(e) => handleKeyDown(e, house.id)}
              tabIndex={0}
              role="button"
              aria-label={`View features of ${house.name}`}
              aria-expanded={activeHouse === house.id}
            >
              {/* Tooltip / Feature card */}
              {activeHouse === house.id && (
                <div
                  className={styles.featureCard}
                  role="tooltip"
                  aria-live="polite"
                >
                  <h4 className={styles.houseName}>{house.name}</h4>
                  <ul className={styles.featureList}>
                    {house.features.map((feature, index) => (
                      <li key={index} className={styles.featureItem}>
                        <span className={styles.featureIcon} aria-hidden="true">
                          {feature.icon}
                        </span>
                        <span>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className={styles.hint}>
        {isMobile ? 'Tap a house to see its features' : 'Hover over a house to see its features'}
      </p>

      {/* Image upload controls */}
      <div className={styles.uploadControls}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
          aria-label="Upload custom aerial image"
        />
        <button
          type="button"
          onClick={handleUploadClick}
          className={styles.uploadButton}
        >
          Upload Custom Image
        </button>
        {customImage && (
          <button
            type="button"
            onClick={handleResetImage}
            className={styles.resetButton}
          >
            Reset to Default
          </button>
        )}
      </div>
    </div>
  );
}
