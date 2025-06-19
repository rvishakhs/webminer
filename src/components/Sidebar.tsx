"use client"

import React from 'react'
import { IoMdHome } from "react-icons/io";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { MdWork } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import Logo from './Logo';
import Link from 'next/link';
import { GiSpiderWeb } from "react-icons/gi";
import { Button, buttonVariants } from './ui/button';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { MenuIcon } from 'lucide-react';

const routes = [
    {
        href:"/",
        label:"Home",
        icon: IoMdHome,
    },
    {
        href:"/workspace",
        label:"Workspace",
        icon: MdWork,
    },
    {
        href:"/credentials",
        label:"credentials",
        icon: RiGitRepositoryPrivateFill,
    },
    {
        href:"/reports",
        label:"Reports",
        icon: TbReportMoney,
    }
]

function DesktopSidebar() {
    const pathname = usePathname();
    const activeRoute = routes.find((route) => pathname === route.href);
    console.log("Active Route:", activeRoute);

  return (
    <div className='hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full 
    bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate'>
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <Logo />
      </div>
      <div className="flex p-2 border-b-[1px] border-separate">
        Here I need to show the username 
      </div>
      <div className="flex flex-col gap-2 p-4">
            {routes.map((route) => (
                
                    <Link key={route.href} href={route.href} className={buttonVariants({
                        variant: activeRoute?.href === route.href ? "sidebarActiveItem" : "sidebar"
                    })}>
                    <route.icon size={20} />
                    {route.label}
                </Link>
            ))}
      </div>
    </div>
  )
}

export function Mobilesidebar(){
    const [isOpen, setOpen] = React.useState(false);
    const pathname = usePathname();
    const activeRoute = routes.find(
        (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0]; // Default to the first route if none match

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className='w-[400px] sm:w-[540px] space-y-4' side={"left"}>
              <div className="flex p-3 flex-col gap-4">
              <Logo />
              <div className='flex flex-col gap-2'>
                {routes.map((route) => (     
                  <Link key={route.href} href={route.href} className={buttonVariants({
                        variant: activeRoute?.href === route.href ? "sidebarActiveItem" : "sidebar"
                    })} onClick={() => setOpen(false)}>
                    <route.icon size={20} />
                    {route.label}
                  </Link>
                ))}
              </div>
              </div>

            </SheetContent>
        </Sheet>
      </nav>
    </div>
  )

}

export default DesktopSidebar
