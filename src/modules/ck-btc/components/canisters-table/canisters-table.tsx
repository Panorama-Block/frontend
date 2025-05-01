"use client"

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import styles from './canisters-table-styles.module.scss'
import { valueShort } from "@/utils/value-short"

type Props = {
  title: string
  data: {
    "canister_id": string,
    "canister_type": string,
    "subnet_id": string,
    "cycle_balance": number,
    "stable_memory_bytes": number,
  }[]
}

const CanistersTable: React.FC<Props> = ({ title, data }: Props) => {
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
                <TableHead className="text-white font-bold text-md">ID</TableHead>
                <TableHead className="text-white font-bold text-md">Type</TableHead>
                <TableHead className="text-white font-bold text-md">Cycles Balance</TableHead>
                <TableHead className="text-white font-bold text-md">Stable Memory Usage</TableHead>
                <TableHead className="text-white font-bold text-md">Subnet ID</TableHead>
              </TableRow>
            </TableHeader>  
            <TableBody>
              {data.slice((actual - 1) * perPage, ((actual - 1) * perPage) + perPage).map((row) => (
                <TableRow key={row.canister_id} className="border-zinc-700 text-[#A0AEC0] hover:bg-[#f2f2f210]">
                  <TableCell className="text-zinc-200 font-medium">{row.canister_id}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.canister_type}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{valueShort(row.cycle_balance)}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{valueShort(row.stable_memory_bytes)}</TableCell>
                  <TableCell className="text-zinc-200 font-medium">{row.subnet_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile view */}
        <div className="md:hidden">
          {data.slice((actual - 1) * perPage, ((actual - 1) * perPage) + perPage).map((row) => (
            <div key={row.canister_id} className="mb-4 p-4 border border-zinc-700 rounded-lg">
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <p className="text-xs text-zinc-400">ID</p>
                  <p className="text-sm text-zinc-200 truncate">{row.canister_id}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Type</p>
                  <p className="text-sm text-zinc-200">{row.canister_type}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Cycles Balance</p>
                  <p className="text-sm text-zinc-200">{valueShort(row.cycle_balance)}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Memory Usage</p>
                  <p className="text-sm text-zinc-200">{valueShort(row.stable_memory_bytes)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-zinc-400">Subnet ID</p>
                  <p className="text-sm text-zinc-200 truncate">{row.subnet_id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CanistersTable