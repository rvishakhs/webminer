"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

function NavigationTabs({workflowid}: {workflowid: string}) {

    const pathname = usePathname();
    const activeValue = pathname.split('/')[2]

    console.log("@@@Active Value:", activeValue);


  return (
    <Tabs value={activeValue} className='w-[350px]'>
        <TabsList className='grid w-full grid-cols-2'>
            <Link href={`/workspace/editor/${workflowid}`}>
            <TabsTrigger value="editor"  className='w-full data-[state=active]:bg-green-400 cursor-pointer'>Editor</TabsTrigger>
            </Link>
            <Link href={`/workspace/runs/${workflowid}`}>
            <TabsTrigger value="runs" className='w-full data-[state=active]:bg-green-400 cursor-pointer'>Runs</TabsTrigger>
            </Link>
        </TabsList>
    </Tabs>
  )
}

export default NavigationTabs
