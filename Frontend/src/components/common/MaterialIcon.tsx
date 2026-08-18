import React from 'react';

interface MaterialIconProps {
  name: string;
  className?: string;
  size?: number | string;
  fill?: boolean;
  style?: React.CSSProperties;
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  name,
  className = '',
  size = 24,
  fill = false,
  style = {}
}) => {
  return (
    <span
      className={`material-symbols-outlined ${fill ? 'fill' : ''} ${className}`}
      style={{
        fontSize: typeof size === 'number' ? `${size}px` : size,
        ...style
      }}
    >
      {name}
    </span>
  );
};
