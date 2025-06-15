"use client"

import React from 'react'
import { IoMdHome } from "react-icons/io";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { MdWork } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import Logo from './Logo';

const routes = [
    {
        href:"/",
        label:"Home",
        icon:"IoMdHome ",
    },
    {
        href:"workspace",
        label:"Workspace",
        icon:"MdWork ",
    },
    {
        href:"credentials",
        label:"credentials",
        icon:"RiGitRepositoryPrivateFill",
    },
    {
        href:"reports",
        label:"Reports",
        icon:"TbReportMoney ",
    }
]

function DesktopSidebar() {
  return (
    <div className='hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full 
    bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate'>
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <Logo />
      </div>
    </div>
  )
}

export default DesktopSidebar
