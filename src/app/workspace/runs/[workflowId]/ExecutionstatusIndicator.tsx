import React from 'react'
import { WorkFlowExecutionStatus } from 'types/workflow'
import { cn } from '~/lib/utils'

const indicatorcolors : Record<WorkFlowExecutionStatus, string> = {
    PENDING: "bg-slate-400",
    RUNNING: "bg-yellow-400",
    FAILED: "bg-red-400",
    COMPLETED: "bg-emerald-600",
}


function ExecutionStatusIndicator({status}: {status : WorkFlowExecutionStatus}) {
  return (
    <div className={cn("w-2 h-2 rounded-full", indicatorcolors[status])} />
  )
}

export default ExecutionStatusIndicator
