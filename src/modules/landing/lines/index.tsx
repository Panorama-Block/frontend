import AnimatedLine from "@/components/ui/AnimatedLine"

interface LinesProps {
  active: string | null
}
const Lines = ({ active }: LinesProps) => {
  // Definir um valor absoluto para o Y final de todas as linhas
  const commonEndY = 1544  // Ajuste este valor conforme necessário para a sua página

  return (
    <div className="relative w-full h-full overflow-y-">
      {/* Todas as linhas agora usam absoluteEndY para terminar no mesmo ponto */}
      <AnimatedLine
        className="absolute top-[-240px] left-0 w-auto"
        animate={false}
        absoluteEndY={commonEndY}
        startLineLength={-150}
      />

      <AnimatedLine
        className="absolute top-[-210px] left-12 w-auto"
        animate={false}
        absoluteEndY={commonEndY - 30}
        startLineLength={100}
      />

      <AnimatedLine
        className="absolute top-[-180px] left-24 w-auto"
        animate={false}
        absoluteEndY={commonEndY - 60}
        startLineLength={-200}
      />

      <AnimatedLine
        className="absolute top-[-150px] left-36 w-auto"
        animate={false}
        absoluteEndY={commonEndY - 90}
        startLineLength={-100}
      />

      {/* Linha animada do lado direito */}
      <AnimatedLine
        className="absolute top-[-240px] right-[10%] w-auto"
        animate={true}
        useGradient={false}
        flip={true}
        // Esta linha será mais longa que o padrão
        absoluteEndY={commonEndY + 150}
        startLineLength={-150}
      />
    </div>
  )
}

export default Lines