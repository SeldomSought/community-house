import React from 'react';
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
  labelPosition: {
    top: string;
    left: string;
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
    labelPosition: {
      top: '15%',
      left: '12%',
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
    labelPosition: {
      top: '10%',
      left: '42%',
    },
  },
  {
    id: 'right',
    name: 'East House',
    features: [
      { name: 'Barbell Gym', icon: '🏋️' },
      { name: 'Plunge Cold Plunge', icon: '🧊' },
    ],
    labelPosition: {
      top: '15%',
      left: '75%',
    },
  },
];

export default function PropertyMap(): JSX.Element {
  // Image paths for optimized loading
  const webpImageUrl = useBaseUrl('/img/home/aerial-view.webp');
  const pngImageUrl = useBaseUrl('/img/home/aerial-view.png');

  return (
    <div className={styles.wrapper}>
      <div className={styles.mapContainer}>
        <picture>
          <source srcSet={webpImageUrl} type="image/webp" />
          <source srcSet={pngImageUrl} type="image/png" />
          <img
            src={pngImageUrl}
            alt="Aerial view of The Fellowship property showing three houses"
            className={styles.aerialImage}
            loading="lazy"
          />
        </picture>

        {/* Static labels on image - desktop only */}
        <div className={styles.staticOverlay}>
          {houses.map((house) => (
            <div
              key={house.id}
              className={styles.houseLabel}
              style={{
                top: house.labelPosition.top,
                left: house.labelPosition.left,
              }}
            >
              <span className={styles.houseLabelName}>{house.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities legend below image */}
      <div className={styles.amenitiesLegend}>
        {houses.map((house) => (
          <div key={house.id} className={styles.houseCard}>
            <h4 className={styles.houseCardName}>{house.name}</h4>
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
        ))}
      </div>
    </div>
  );
}
