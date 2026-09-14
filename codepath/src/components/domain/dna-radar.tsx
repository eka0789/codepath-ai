"use client";

import { useMemo } from "react";

interface Dimension {
  name: string;
  value: number;
}

interface DnaRadarProps {
  dimensions: Dimension[];
  size?: number;
  className?: string;
}

export function DnaRadar({ dimensions, size = 300, className }: DnaRadarProps) {
  const center = size / 2;
  const radius = (size / 2) * 0.8;
  const levels = 5;

  const points = useMemo(() => {
    return dimensions.map((dim, i) => {
      const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
      const value = dim.value / 100;
      return {
        x: center + radius * value * Math.cos(angle),
        y: center + radius * value * Math.sin(angle),
        labelX: center + (radius + 20) * Math.cos(angle),
        labelY: center + (radius + 20) * Math.sin(angle),
        name: dim.name,
        value: dim.value,
      };
    });
  }, [dimensions, center, radius]);

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  const levelPolygons = useMemo(() => {
    return Array.from({ length: levels }, (_, level) => {
      const r = (radius / levels) * (level + 1);
      return dimensions
        .map((_, i) => {
          const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
          return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
        })
        .join(" ");
    });
  }, [dimensions, center, radius, levels]);

  const axisLines = dimensions.map((_, i) => {
    const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2;
    return {
      x1: center,
      y1: center,
      x2: center + radius * Math.cos(angle),
      y2: center + radius * Math.sin(angle),
    };
  });

  return (
    <svg width={size} height={size} className={className} viewBox={`0 0 ${size} ${size}`}>
      {levelPolygons.map((poly, i) => (
        <polygon
          key={i}
          points={poly}
          fill="none"
          stroke="hsl(240 3.7% 15.9%)"
          strokeWidth={1}
          opacity={0.2}
        />
      ))}
      {axisLines.map((line, i) => (
        <line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="hsl(240 3.7% 15.9%)"
          strokeWidth={1}
          opacity={0.2}
        />
      ))}
      <polygon
        points={polygonPoints}
        fill="hsl(239 84% 67% / 0.2)"
        stroke="hsl(239 84% 67%)"
        strokeWidth={2}
      />
      {points.map((point, i) => (
        <g key={i}>
          <circle
            cx={point.x}
            cy={point.y}
            r={4}
            fill="hsl(239 84% 67%)"
          />
          <text
            x={point.labelX}
            y={point.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="currentColor"
            fontSize={12}
            fontWeight={500}
          >
            {point.name}
          </text>
          <text
            x={point.labelX}
            y={point.labelY + 14}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="hsl(240 3.8% 46.1%)"
            fontSize={12}
          >
            {point.value}
          </text>
        </g>
      ))}
    </svg>
  );
}