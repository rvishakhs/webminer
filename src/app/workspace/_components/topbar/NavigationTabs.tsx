"use client"

import Link from 'next/link'
import React from 'react'
import { Tabs, TabsList } from '~/components/ui/tabs'

function NavigationTabs({workflowid}: {workflowid: string}) {
  return (
    <Tabs className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
            <Link href={`/workspace/editor/${workflowid}`}>Editor</Link>
            <Link href={`/workspace/runs/${workflowid}`}>Runs</Link>
        </TabsList>
    </Tabs>
  )
}

export default NavigationTabs
