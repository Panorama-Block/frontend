import React, { useEffect, useState } from 'react'

interface AnimatedLineProps {
  width?: number
  height?: number
  className?: string
  duration?: number
  color?: string  // Cor única para a linha (sólida)
  startColor?: string  // Para gradiente (se useGradient=true)
  endColor?: string    // Para gradiente (se useGradient=true)
  staticColor?: string // Cor para linhas não animadas
  strokeWidth?: number
  path?: string // Caminho SVG completo personalizado
  flip?: boolean  // Para inverter horizontalmente
  reverseAnimation?: boolean  // Para inverter a direção da animação
  animate?: boolean // Para ativar/desativar a animação
  useGradient?: boolean // Se true, usa gradiente, caso contrário usa cor sólida
  gradientColors?: { color: string; offset: number }[] // Cores personalizadas para o gradiente
  preserveAspectRatio?: string // Controle de preserveAspectRatio
  endLineLength?: number // Comprimento da reta final (valor positivo para estender, negativo para encurtar)
  startLineLength?: number // Comprimento da reta inicial (valor positivo para estender, negativo para encurtar)
  absoluteEndY?: number // Nova propriedade: posição Y absoluta onde a linha deve terminar
}

// Estilos CSS necessários para a animação
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

// Função para gerar/modificar o path com base no endLineLength e startLineLength
function generatePath(basePath: string, endLineLength?: number, startLineLength?: number, absoluteEndY?: number): string {
  let modifiedPath = basePath

  // Modificar o início da linha se startLineLength estiver definido
  if (startLineLength !== undefined) {
    try {
      // Path formato padrão: "M169.402 1.16575C169.402 242.669 169.402 832.358 ..."
      // Primeiro identificamos onde o path começa (M) e onde termina a primeira linha vertical (antes do C ou outro comando)

      // Encontrar a posição inicial do path ("M")
      const mIndex = modifiedPath.indexOf('M')
      if (mIndex === -1) return modifiedPath

      // Encontrar o primeiro comando após M (geralmente C, L ou outro comando)
      const firstCommandMatch = modifiedPath.substring(mIndex + 1).match(/[A-Za-z]/)
      if (!firstCommandMatch) return modifiedPath

      const firstCommandIndex = firstCommandMatch.index! + mIndex + 1

      // Extrair as coordenadas x,y do ponto inicial
      const initialCoords = modifiedPath.substring(mIndex + 1, firstCommandIndex).trim()
      const [startX, startY] = initialCoords.split(' ').map(Number)

      // Extrair as próximas coordenadas após o comando (C, L, etc)
      const nextPart = modifiedPath.substring(firstCommandIndex)

      // Calcular a nova coordenada Y ajustada pelo startLineLength
      const newStartY = startY + startLineLength

      // Reconstruir o path com a nova coordenada Y inicial
      modifiedPath = `M${startX} ${newStartY}${nextPart}`
    } catch (error) {
      console.error("Erro ao modificar início do path:", error)
    }
  }

  // Se absoluteEndY estiver definido, ele tem prioridade sobre endLineLength
  if (absoluteEndY !== undefined) {
    try {
      // Encontrar a última coordenada "L"
      const lastLIndex = modifiedPath.lastIndexOf('L')
      if (lastLIndex === -1) return modifiedPath // Não encontrou a última coordenada L

      // Extrair as coordenadas x,y da última posição
      const endPart = modifiedPath.substring(lastLIndex + 1)
      const [lastX, lastY] = endPart.trim().split(' ').map(Number)

      // Substituir a coordenada Y final pela absoluteEndY
      const beforeLastL = modifiedPath.substring(0, lastLIndex + 1)
      modifiedPath = `${beforeLastL}${lastX} ${absoluteEndY}`

      return modifiedPath
    } catch (error) {
      console.error("Erro ao definir posição Y absoluta do final:", error)
    }
  }
  // Caso contrário, usar endLineLength se estiver definido
  else if (endLineLength !== undefined) {
    try {
      // Encontrar a última coordenada "L"
      const lastLIndex = modifiedPath.lastIndexOf('L')
      if (lastLIndex === -1) return modifiedPath // Não encontrou a última coordenada L

      // Extrair a penúltima coordenada L
      const penultimateL = modifiedPath.lastIndexOf('L', lastLIndex - 1)
      if (penultimateL === -1) return modifiedPath // Não encontrou a penúltima L

      // Extrair as partes do path
      const startPart = modifiedPath.substring(0, penultimateL + 1); // Inclui o "L" da penúltima coordenada

      // Extrair as coordenadas x,y da penúltima posição
      const middlePart = modifiedPath.substring(penultimateL + 1, lastLIndex)
      const [penX, penY] = middlePart.trim().split(' ').map(Number)

      // Extrair as coordenadas x,y da última posição
      const endPart = modifiedPath.substring(lastLIndex + 1)
      const [lastX, lastY] = endPart.trim().split(' ').map(Number)

      // Calcular a nova coordenada Y ajustada pelo endLineLength
      const newLastY = lastY + endLineLength

      // Montar o novo path
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
  color = '#00FFFF',    // Cor padrão sólida
  startColor = '#4C4C4C',
  endColor = '#212121',
  staticColor = '#4C4C4C', // Cor padrão para linhas não animadas
  strokeWidth = 1,
  path = "M169.402 1.16575C169.402 242.669 169.402 832.358 169.402 832.358L0.52532 921.421L0.525295 1500.32",
  flip = false,
  reverseAnimation = false,
  animate = true,
  useGradient = false,  // Por padrão, usa cor sólida
  gradientColors,
  preserveAspectRatio = "none",
  endLineLength,
  startLineLength,
  absoluteEndY,
}) => {
  // Gerar um ID único para o gradiente para evitar conflitos quando houver múltiplas linhas
  const [gradientId] = useState(`gradient-${Math.random().toString(36).substring(2, 11)}`)

  // Gerar o path modificado com base no endLineLength e startLineLength
  const modifiedPath = generatePath(path, endLineLength, startLineLength, absoluteEndY)

  // Transformação para flip horizontal se necessário
  const transform = flip ? `scale(-1, 1) translate(-${width}, 0)` : ''

  // Injetar os estilos CSS necessários para a animação
  useEffect(() => {
    // Verificar se os estilos já foram adicionados para evitar duplicação
    const id = 'animated-line-styles'
    if (!document.getElementById(id)) {
      const styleEl = document.createElement('style')
      styleEl.id = id
      styleEl.innerHTML = AnimatedLineStyles
      document.head.appendChild(styleEl)
    }

    return () => {
      // Não removeremos o estilo na limpeza, pois outros componentes podem estar usando
    }
  }, [])

  // Determinar o stroke a ser usado
  let strokeValue

  if (!animate) {
    // Linha estática - sempre usa cor sólida
    strokeValue = staticColor
  } else if (useGradient) {
    // Linha animada com gradiente
    strokeValue = `url(#${gradientId})`
  } else {
    // Linha animada com cor sólida
    strokeValue = color
  }

  // Determinar a classe correta - static-line ou animated-line com animação
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
