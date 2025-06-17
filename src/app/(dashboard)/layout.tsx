import { ThemeProvider } from 'next-themes'
import React from 'react'
import BreadcrumbHeader from '~/components/BreadcrumbHeader'
import DesktopSidebar from '~/components/Sidebar'
import { ModeToggle } from '~/components/ThemeModeToggle'
import { Separator } from '~/components/ui/separator'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen'>
        <DesktopSidebar />

      <div className="flex flex-col flex-1 min-h-screen">
        <header className='flex items-center justify-between px-6 py-4 h-[50px] container'>
            <BreadcrumbHeader />
            <div className="gp-1 flex items-center">
                <ModeToggle />
            </div>
        </header>
        <Separator />
        <div className="overflow-auto">
            <div className="flex-1 container py-4 px-4 text-accent-foreground">
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
            </div>
        </div>
      </div>
    </div>
  )
}

export default layout
