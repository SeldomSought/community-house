import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface Floor {
  id: string;
  label: string;
  image: string;
  alt: string;
}

interface FloorPlanProps {
  floors: Floor[];
  title?: string;
}

export default function FloorPlan({ 
  floors, 
  title = "Explore Our Space" 
}: FloorPlanProps): JSX.Element {
  const [activeFloor, setActiveFloor] = useState(floors[0]?.id || '');
  
  const currentFloor = floors.find(f => f.id === activeFloor) || floors[0];
  
  return (
    <section className={styles.container}>
      {title && (
        <h2 className={styles.title}>{title}</h2>
      )}
      
      <div className={clsx('floor-plan-tabs', styles.tabs)} role="tablist">
        {floors.map((floor) => (
          <button
            key={floor.id}
            role="tab"
            aria-selected={activeFloor === floor.id}
            aria-controls={`floor-panel-${floor.id}`}
            className={clsx(
              'floor-plan-tab',
              styles.tab,
              activeFloor === floor.id && styles.tabActive
            )}
            onClick={() => setActiveFloor(floor.id)}
          >
            {floor.label}
          </button>
        ))}
      </div>
      
      <div className={styles.imageContainer}>
        {floors.map((floor) => (
          <div
            key={floor.id}
            id={`floor-panel-${floor.id}`}
            role="tabpanel"
            aria-hidden={activeFloor !== floor.id}
            className={clsx(
              styles.panel,
              activeFloor === floor.id && styles.panelActive
            )}
          >
            <img
              src={floor.image}
              alt={floor.alt}
              className={clsx('floor-plan-image', styles.image)}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
