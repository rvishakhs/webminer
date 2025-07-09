import React, { Suspense } from 'react'
import Topbar from '../../_components/topbar/Topbar'
import { GetWorkflowexecutions } from 'actions/workflows/getWorkflowexecutions';
import { InboxIcon, Loader } from 'lucide-react';
import ExecutionsTable from './ExecutionsTable';

function ExecutionsPage({params}: {params: {workflowId: string}}) {
  return (
    <div className='h-full w-full overflow-auto'>
      <Topbar workflowId={params.workflowId}
        hideBtn
        tittle='All runs'
        subtittle='View all runs of this workflow'
      />
      <Suspense fallback={
        <div className='flex items-center justify-center '>
            <Loader size={30} className='animate-spin stroke-primary' />
        </div>
      }>
        <ExecutionsTablewrapper workflowId={params.workflowId} />
      </Suspense>

      
    </div>
  )
}

export default ExecutionsPage


async function ExecutionsTablewrapper({workflowId}: {workflowId: string}) {
    const executions = await GetWorkflowexecutions(workflowId);

    if(!executions){
        return <div className=""> No data</div>
    }

    if(executions.length === 0) {
        return (
            <div className='w-full h-full py-6 overflow-auto'>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center'>
                        <InboxIcon size={40} className='stroke-primary' />
                    </div>
                    <div className='flex items-center justify-center gap-2 flex-col'>
                        <p className="">No runs have been triggered yet for this workflow</p>
                        <p className="text-muted-foreground text-sm">You can trigger a run in the Editor page.

                        </p>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <ExecutionsTable workflowid={workflowId} initialdata={executions}/>

        // <pre>
        //     {JSON.stringify(executions, null, 4)}
        // </pre>
    )

}
