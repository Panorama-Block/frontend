import React from 'react';

interface AnimatedVerticalLineProps {
  width?: number;
  height?: number;
  className?: string;
  duration?: number;
  startColor?: string;
  endColor?: string;
  strokeWidth?: number;
  path?: string;
}

const AnimatedVerticalLine: React.FC<AnimatedVerticalLineProps> = ({
  width = 171,
  height = 952,
  className = '',
  duration = 5,
  startColor = '#B7B7B7',
  endColor = '#00FFFF',
  strokeWidth = 1,
  path = "M169.876 1C169.876 167.059 169.876 639.004 169.876 639.004L0.999937 749.518L0.999943 950.646"
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={`animated-vertical-line ${className}`}
      style={{
        '--animation-duration': `${duration}s`,
        '--start-color': startColor,
        '--end-color': endColor
      } as React.CSSProperties}
    >
      <path
        d={path}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        className="line-path"
      />
    </svg>
  );
};

export default AnimatedVerticalLine;
