import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeatureCardProps extends Feature {
  index?: number;
}

export default function FeatureCard({
  title,
  description,
  icon,
  index = 0,
}: FeatureCardProps): JSX.Element {
  const iconUrl = useBaseUrl(icon);
  return (
    <article
      className={clsx('feature-card', styles.card)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={styles.iconWrapper}>
        <img
          src={iconUrl}
          alt=""
          className={styles.icon}
          loading="lazy"
          aria-hidden="true"
        />
      </div>
      <h3 className={clsx('feature-card__title', styles.title)}>
        {title}
      </h3>
      <p className={clsx('feature-card__description', styles.description)}>
        {description}
      </p>
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
