'use client'

import { SignedIn, UserButton } from '@clerk/nextjs'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import BreadcrumbHeader from '~/components/BreadcrumbHeader'
import DesktopSidebar from '~/components/Sidebar'
import { ModeToggle } from '~/components/ThemeModeToggle'
import { Separator } from '~/components/ui/separator'
import { useTheme } from 'next-themes';
import { dark, light } from '@clerk/themes'; // adjust import if needed


function layout({ children }: { children: React.ReactNode }) {

  const{ resolvedTheme } = useTheme();

  const currentClerkTheme = resolvedTheme === 'dark' ? dark : light;

  return (
    <div className='flex h-screen'>
        <DesktopSidebar />

      <div className="flex flex-col flex-1 min-h-screen">
        <header className='flex items-center justify-between px-6 py-4 h-[50px] container'>

            <BreadcrumbHeader />
            <div className="gp-2 flex items-center justify-center p">
                <ModeToggle />
                <div className='flex items-center p-1'>
                  <SignedIn >
                    <UserButton appearance={{
                      baseTheme: currentClerkTheme,
                    }}/>
                  </SignedIn>
                </div>
            </div>
        </header>
        <Separator />
        <div className="overflow-auto">
            <div className="flex-1 container py-4 px-4 text-accent-foreground">
                {children}
            </div>
        </div>
      </div>
    </div>
  )
}

export default layout
