"use client"

import { PlayIcon } from 'lucide-react'
import React from 'react'
import { Button } from '~/components/ui/button'
import useExecutionPlan from '~/hooks/useExecutionPlan'

function ExecuteBtn({ workflowId }: { workflowId: string }) {
    const generte = useExecutionPlan()

  return (
    <Button 
        variant={"outline"}
        className='flex items-center gap-2'
        onClick={() => {
            const plan = generte();
            console.log("Execution Plan: ");
            console.table(plan); 
        }}
    >
        <PlayIcon size={16} className='stroke-amber-400'/>
        Execute  
    </Button>
  )
}

export default ExecuteBtn