"use client"

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import styles from './table-styles.module.scss'

type Props = {
  title: string
  data: {
    "id": string,
    "name": string,
    "symbol": string,
    "decimals": number
  }[]
}

const TokensTable: React.FC<Props> = ({ title, data }: Props) => {
  const [actual, setActual] = useState(1)
  const perPage = 6

  return (
    <div className="flex flex-col mt-1 text-white">
      <div className="flex gap-3">
        <h3 className="ml-4 sm:ml-8 text-lg font-bold">{title}</h3>
      </div>

      <div className={`${styles.card} my-4`}>
        <div className="hidden md:flex">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-600 hover:bg-[#f2f2f210]">
                <TableHead className="text-white font-bold text-md">Token ID</TableHead>
                <TableHead className="text-white font-bold text-md">Name</TableHead>
                <TableHead className="text-white font-bold text-md">Symbol</TableHead>
                <TableHead className="text-white font-bold text-md">Decimals</TableHead>
              </TableRow>
            </TableHeader>  
            <TableBody>
              {data.slice((actual - 1) * perPage, ((actual - 1) * perPage) + perPage).map((token) => (
                <TableRow key={token.id} className="border-zinc-700 text-[#A0AEC0] hover:bg-[#f2f2f210]">
                  <TableCell className="text-zinc-200 font-medium">{token.id}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{token.name}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{token.symbol}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{token.decimals}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile view */}
        <div className="md:hidden">
          {data.slice((actual - 1) * perPage, ((actual - 1) * perPage) + perPage).map((token) => (
            <div key={token.id} className="mb-4 p-4 border border-zinc-700 rounded-lg">
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <p className="text-xs text-zinc-400">Token ID</p>
                  <p className="text-sm text-zinc-200 truncate">{token.id}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Name</p>
                  <p className="text-sm text-zinc-200">{token.name}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Symbol</p>
                  <p className="text-sm text-zinc-200">{token.symbol}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Decimals</p>
                  <p className="text-sm text-zinc-200">{token.decimals}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TokensTable