import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Vignette from '@site/src/components/Vignette';
import styles from './styles.module.css';

export interface Feature {
  title: string;
  description: string;
  icon: string;
  /** Where on the property this lives, printed as a woven label. */
  where?: string;
  /** Key for the label's ink: west | main | east | west-east | grounds | all | area */
  house?: string;
  /** Name of a hand-drawn vignette (src/components/Vignette); falls back to icon. */
  vignette?: string;
}

interface FeatureCardProps extends Feature {
  index?: number;
}

export default function FeatureCard({
  title,
  description,
  icon,
  where,
  house,
  vignette,
  index = 0,
}: FeatureCardProps): JSX.Element {
  const iconUrl = useBaseUrl(icon);
  return (
    <article
      className={clsx('feature-card', styles.card)}
      data-house={house}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {vignette ? (
        <Vignette name={vignette} className={styles.drawing} size={96} />
      ) : (
        <div className={styles.iconWrapper}>
          {/* drawn as a mask so the icon takes the card's ink colour */}
          <span
            className={styles.icon}
            aria-hidden="true"
            style={{
              WebkitMaskImage: `url(${iconUrl})`,
              maskImage: `url(${iconUrl})`,
            }}
          />
        </div>
      )}
      <h3 className={clsx('feature-card__title', styles.title)}>
        {title}
      </h3>
      <p className={clsx('feature-card__description', styles.description)}>
        {description}
      </p>
      {where && (
        <span className={clsx('woven-label', styles.where)} data-house={house}>
          {where}
        </span>
      )}
    </article>
  );
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export function FeatureGrid({ 
  features, 
  columns = 3 
}: FeatureGridProps): JSX.Element {
  return (
    <div 
      className={styles.grid}
      style={{ 
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` 
      }}
    >
      {features.map((feature, index) => (
        <FeatureCard 
          key={feature.title} 
          {...feature} 
          index={index}
        />
      ))}
    </div>
  );
}
