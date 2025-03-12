import React from 'react'
import Sidebar from '../sidebar/sidebar'
import Header from '../header/header'

interface LayoutProps {
  children: React.ReactNode
  sidebar: {
    actual: string
    onChange: (coin: string) => void
    open: (page: string) => void
  }
  header: {
    onSubmit: (type: string, value: string) => void
  }
}

const Layout: React.FC<LayoutProps> = ({ children, sidebar, header }) => {
  return (
    <div className="flex w-[100%] h-[100%] min-h-[100vh] bg-[#051718]">
      <Sidebar
        actual={sidebar.actual}
        onChange={sidebar.onChange}
        open={sidebar.open}
      />
      <div className="flex flex-col flex-1 overflow-hidden pb-20 overflow-y-auto max-h-[100vh]">
        <Header onSubmit={header.onSubmit} />
        <main className="px-6">{children}</main>
      </div>
    </div>
  )
}

export default Layout
