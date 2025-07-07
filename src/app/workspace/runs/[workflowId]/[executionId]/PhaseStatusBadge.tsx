import { CircleCheck, CircleDashedIcon, CircleX, FilePlus, Loader2 } from 'lucide-react'
import React from 'react'
import { ExecutionPhaseStatus } from 'types/workflow'

function PhaseStatusBadge({status} : {status: ExecutionPhaseStatus}) {
  
    switch (status) {
        case ExecutionPhaseStatus.CREATED: 
            return <FilePlus size={20} className='stroke-muted-foreground' />;
        case ExecutionPhaseStatus.PENDING: 
            return <CircleDashedIcon size={20} className=' stroke-yellow-500' />;

        case ExecutionPhaseStatus.RUNNING: 
            return <Loader2 size={20} className='animate-spin stroke-yellow-500' />;
        case ExecutionPhaseStatus.FAILED: 
            return <CircleX size={20} className='stroke-destructive' />;
        case ExecutionPhaseStatus.COMPLETED: 
            return <CircleCheck size={20} className='stroke-primary' />;
        default:
            return <div className="rounded-full">{status}</div>
    }
  
}

export default PhaseStatusBadge
