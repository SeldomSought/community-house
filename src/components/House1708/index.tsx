import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

interface House1708ViewerProps {
  height?: string;
}

function LoadingFallback({ height = '600px' }: { height?: string }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.viewer} style={{ height }}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <span>Loading 3D Floor Plan...</span>
        </div>
      </div>
    </div>
  );
}

export default function House1708Viewer({ height = '600px' }: House1708ViewerProps): JSX.Element {
  return (
    <BrowserOnly fallback={<LoadingFallback height={height} />}>
      {() => {
        // Dynamic import to avoid SSR issues
        const House1708Model = require('./House1708Model').default;
        return (
          <div className={styles.wrapper}>
            <div className={styles.viewerContainer} style={{ height }}>
              <House1708Model />
            </div>
            <p className={styles.hint}>
              Drag to rotate • Scroll to zoom • Hover over rooms to explore
            </p>
          </div>
        );
      }}
    </BrowserOnly>
  );
}
