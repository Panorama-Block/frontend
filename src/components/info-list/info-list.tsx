import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface Transaction {
  id: string
  name: string
  date: string
  amount: string
  description?: string
  logo?: string
}

interface InfoListProps {
  transactions: Transaction[]
  className?: string
  title?: string
  showLogo?: boolean
}

export function InfoList({ transactions, className, title = "Transactions", showLogo = true }: InfoListProps) {
  return (
    <Card className={cn("p-6 bg-[linear-gradient(125deg,#17707812_15%,#12606750_35%,#0c4b51_100%)] border-[#1a2555]", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">{title}</h3>
      </div>
      <ul className="divide-y divide-[#1a2555]">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="py-4 flex items-center">
            {showLogo && (
              <img
                src={transaction.logo}
                alt="logo"
                className="h-10 w-10 rounded-full mr-4"
              />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-100">
                {transaction.name}
              </p>
              <p className="text-sm text-gray-200">
                {transaction.date}
              </p>
              {transaction.description && (
                <p className="text-xs text-gray-400 mt-1">
                  {transaction.description}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-200">
                {transaction.amount}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}