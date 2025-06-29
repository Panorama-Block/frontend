import React, { useEffect, useState } from 'react'

interface AnimatedLineProps {
  width?: number
  height?: number
  className?: string
  duration?: number
  color?: string
  startColor?: string
  endColor?: string
  staticColor?: string
  strokeWidth?: number
  path?: string
  flip?: boolean
  reverseAnimation?: boolean
  animate?: boolean
  useGradient?: boolean
  gradientColors?: { color: string; offset: number }[]
  preserveAspectRatio?: string
  endLineLength?: number
  startLineLength?: number
  absoluteEndY?: number
}

const AnimatedLineStyles = `
  .animated-line .line-path {
    stroke-dasharray: 1500;
    stroke-dashoffset: 1500;
  }

  .static-line .line-path {
    stroke-dasharray: none;
    stroke-dashoffset: 0;
  }

  .animated-line.animate .line-path {
    animation: draw-line var(--animation-duration, 5s) var(--animation-direction, normal) forwards;
  }

  @keyframes draw-line {
    to {
      stroke-dashoffset: 0;
    }
  }
`

function generatePath(basePath: string, endLineLength?: number, startLineLength?: number, absoluteEndY?: number): string {
  let modifiedPath = basePath

  if (startLineLength !== undefined) {
    try {
      const mIndex = modifiedPath.indexOf('M')
      if (mIndex === -1) return modifiedPath

      const firstCommandMatch = modifiedPath.substring(mIndex + 1).match(/[A-Za-z]/)
      if (!firstCommandMatch) return modifiedPath

      const firstCommandIndex = firstCommandMatch.index! + mIndex + 1
      const initialCoords = modifiedPath.substring(mIndex + 1, firstCommandIndex).trim()
      const [startX, startY] = initialCoords.split(' ').map(Number)

      const nextPart = modifiedPath.substring(firstCommandIndex)

      const newStartY = startY + startLineLength

      modifiedPath = `M${startX} ${newStartY}${nextPart}`
    } catch (error) {
      console.error("Erro ao modificar início do path:", error)
    }
  }

  if (absoluteEndY !== undefined) {
    try {
      const lastLIndex = modifiedPath.lastIndexOf('L')
      if (lastLIndex === -1) return modifiedPath

      const endPart = modifiedPath.substring(lastLIndex + 1)
      const [lastX, lastY] = endPart.trim().split(' ').map(Number)
      const beforeLastL = modifiedPath.substring(0, lastLIndex + 1)
      modifiedPath = `${beforeLastL}${lastX} ${absoluteEndY}`

      return modifiedPath
    } catch (error) {
      console.error("Erro ao definir posição Y absoluta do final:", error)
    }
  }
  else if (endLineLength !== undefined) {
    try {
      const lastLIndex = modifiedPath.lastIndexOf('L')
      if (lastLIndex === -1) return modifiedPath
      const penultimateL = modifiedPath.lastIndexOf('L', lastLIndex - 1)
      if (penultimateL === -1) return modifiedPath

      const startPart = modifiedPath.substring(0, penultimateL + 1)

      const middlePart = modifiedPath.substring(penultimateL + 1, lastLIndex)
      const [penX, penY] = middlePart.trim().split(' ').map(Number)
      const endPart = modifiedPath.substring(lastLIndex + 1)
      const [lastX, lastY] = endPart.trim().split(' ').map(Number)

      const newLastY = lastY + endLineLength

      modifiedPath = `${startPart}${penX} ${penY}${modifiedPath.charAt(lastLIndex)}${lastX} ${newLastY}`
    } catch (error) {
      console.error("Erro ao modificar final do path:", error)
    }
  }

  return modifiedPath
}

const AnimatedLine: React.FC<AnimatedLineProps> = ({
  width = 170,
  height = 1600,
  className = '',
  duration = 5,
  color = '#00FFFF',
  startColor = '#4C4C4C',
  endColor = '#212121',
  staticColor = '#4C4C4C',
  strokeWidth = 1,
  path = "M169.402 500C169.402 442.669 169.402 832.358 169.402 832.358L0.52532 921.421L0.525295 1500.32",
  flip = false,
  reverseAnimation = false,
  animate = true,
  useGradient = false,
  gradientColors,
  preserveAspectRatio = "none",
  endLineLength,
  startLineLength,
  absoluteEndY,
}) => {
  const [gradientId] = useState(`gradient-${Math.random().toString(36).substring(2, 11)}`)

  const modifiedPath = generatePath(path, endLineLength, startLineLength, absoluteEndY)
  const transform = flip ? `scale(-1, 1) translate(-${width}, 0)` : ''

  useEffect(() => {
    const id = 'animated-line-styles'
    if (!document.getElementById(id)) {
      const styleEl = document.createElement('style')
      styleEl.id = id
      styleEl.innerHTML = AnimatedLineStyles
      document.head.appendChild(styleEl)
    }

    return () => {
    }
  }, [])

  let strokeValue

  if (!animate) {
    strokeValue = staticColor
  } else if (useGradient) {
    strokeValue = `url(#${gradientId})`
  } else {
    strokeValue = color
  }

  const lineClass = animate ? 'animated-line animate' : 'static-line'

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${lineClass} ${className}`}
      style={{
        '--animation-duration': `${duration}s`,
        '--animation-direction': reverseAnimation ? 'reverse' : 'normal'
      } as React.CSSProperties}
      preserveAspectRatio={preserveAspectRatio}
    >
      {animate && useGradient && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            {gradientColors ? (
              gradientColors.map((gc, index) => (
                <stop key={index} offset={gc.offset} stopColor={gc.color} />
              ))
            ) : (
              <>
                <stop stopColor={startColor} />
                <stop offset="1" stopColor={endColor} />
              </>
            )}
          </linearGradient>
        </defs>
      )}
      <path
        d={modifiedPath}
        stroke={strokeValue}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        className="line-path"
        transform={transform}
      />
    </svg>
  )
}

export default AnimatedLine
