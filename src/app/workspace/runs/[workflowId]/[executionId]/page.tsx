import { GetWorkFlowExecutionWithPhases } from 'actions/workflows/getWorkFlowExecutionWithPhases';
import { Loader2Icon } from 'lucide-react';
import React, { Suspense } from 'react'
import Topbar from '~/app/workspace/_components/topbar/Topbar';
import { waitFor } from '~/lib/helper/waitFor';
import ExecutionViewer from './_components/ExecutionViewer';

function ExecutionViewerPage({params} : {
    params: {
        workflowId: string;
        executionId: string;
    }
}) {
  return (
    <div
        className='flex flex-col h-screen w-full overflow-hidden'                    
    >
        <Topbar 
            workflowId={params.workflowId} 
            tittle='Execution Viewer'
            subtittle={`RUN ID: ${params.executionId}`}
            hideBtn
            />
            <section className='flex h-full overflow-auto'>
                <Suspense fallback={
                    <div className='flex items-center justify-center w-full'>
                        <Loader2Icon className='animate-spin stroke-primary h-10 w-10'/>
                    </div>
                }>
                    <ExecutionViewerWrapper exeutionId={params.executionId}/>
                </Suspense>
            </section>
    </div>
  )
}

export default ExecutionViewerPage

async function ExecutionViewerWrapper({exeutionId} : {exeutionId: string}) {

    const workflowExecution = await GetWorkFlowExecutionWithPhases(exeutionId);
    if(!workflowExecution) {
        return <div>
            Not Found
        </div>
    }
    return (
        <ExecutionViewer executiondata={workflowExecution}/>
    )
}
