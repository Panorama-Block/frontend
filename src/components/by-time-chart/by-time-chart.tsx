import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { valueShort } from "@/utils/value-short"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface DataPoint {
  date?: string
  timestamp?: number
  [key: string]: any
  currentState?: boolean
}

interface DataSeries {
  key: string
  label: string
  color: string
  formatter?: (value: number) => string
  yAxisId?: 'left' | 'right'
}

interface AreaChartProps {
  data: DataPoint[]
  dataSeries: DataSeries[]
  className?: string
  title?: string
  description?: string
  periods?: {
    value: string
    label: string
  }[]
  defaultPeriod?: string
  autoAdjustDomain?: boolean
  domainPadding?: number
  dateFormat?: (timestamp: number) => string
}

const defaultFormatter = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value)
}

const defaultDateFormat = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export const ByTimeChart = ({
  data,
  dataSeries,
  className,
  title,
  description,
  periods,
  defaultPeriod = "24H",
  autoAdjustDomain = true,
  domainPadding = 0.1,
  dateFormat = defaultDateFormat
}: AreaChartProps) => {
  const domains: Record<string, [number, number]> = {};

  const processedData = data.map(point => {
    const newPoint = { ...point };
    
    if (!newPoint.date && newPoint.timestamp) {
      newPoint.date = dateFormat(newPoint.timestamp);
    }
    
    return newPoint;
  });

  if (autoAdjustDomain && processedData.length > 0) {
    dataSeries.forEach(series => {
      const yAxisId = series.yAxisId || "left";
      if (!domains[yAxisId]) {
        let min = Infinity;
        let max = -Infinity;

        processedData.forEach(point => {
          const value = Number(point[series.key]);
          if (!isNaN(value)) {
            min = Math.min(min, value);
            max = Math.max(max, value);
          }
        });

        if (min !== Infinity && max !== -Infinity) {
          const range = max - min;
          const padding = range === 0 ? max * domainPadding : range * domainPadding;
          domains[yAxisId] = [
            Math.max(0, min - padding),
            max + padding
          ];
        }
      }
    });
  }

  return (
    <Card className={`${className} border-[#1a2657]`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            {title && <h3 className="text-lg font-medium text-gray-200">{title}</h3>}
            {description && <p className="text-sm text-gray-400">
              {description}
            </p>}
          </div>
          {periods && (
            <Tabs defaultValue={defaultPeriod} className="mx-8">
              <TabsList className="bg-[#3ce0ef32]">
                {periods.map((period) => (
                  <TabsTrigger
                    key={period.value}
                    value={period.value}
                    className="text-gray-400 data-[state=active]:bg-[#3CDFEF99] data-[state=active]:text-white"
                  >
                    {period.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </div>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={processedData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                {dataSeries.map((series) => (
                  <linearGradient
                    key={`color${series.key}`}
                    id={`color${series.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={series.color} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={series.color} stopOpacity={0.01} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
                stroke="#1a2657"
              />
              <XAxis
                dataKey="date"
                stroke="#d2d2d2"
                fontSize={12}
                tickMargin={20}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                stroke="#d2d2d2"
                tickMargin={10}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => valueShort(value)}
                domain={domains["left"] || ["auto", "auto"]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#d2d2d2"
                tickMargin={10}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                domain={domains["right"] || ["auto", "auto"]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const dataPoint = payload[0].payload as DataPoint
                    return (
                      <div className="rounded-lg border border-[#1a2657] bg-[#3CDFEF99] p-2 shadow-xl">
                        <div className="grid gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-gray-300">
                              Time
                            </span>
                            <span className="font-bold text-gray-300">
                              {dataPoint.date}
                            </span>
                          </div>
                          {dataSeries.map((series) => (
                            <div key={series.key} className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-gray-300">
                                {series.label}
                              </span>
                              <span className="font-bold text-gray-300">
                                {(series.formatter || defaultFormatter)(dataPoint[series.key] as number)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              {dataSeries.map((series) => (
                <Area
                  key={series.key}
                  type="monotone"
                  dataKey={series.key}
                  stroke={series.color}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#color${series.key})`}
                  yAxisId={series.yAxisId || "left"}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
          {dataSeries.map((series) => (
            <div key={series.key} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: series.color }} />
              <span>{series.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}