import React from 'react'
import Topbar from '../../_components/topbar/Topbar'
import { GetWorkflowexecutions } from 'actions/workflows/getWorkflowexecutions';

function ExecutionsPage({params}: {params: {workflowId: string}}) {
  return (
    <div className='h-full w-full overflow-auto'>
      <Topbar workflowId={params.workflowId}
        hideBtn
        tittle='All runs'
        subtittle='View all runs of this workflow'
      />

      <ExecutionsTable workflowId={params.workflowId} />
      
    </div>
  )
}

export default ExecutionsPage


async function ExecutionsTable({workflowId}: {workflowId: string}) {
    const executions = await GetWorkflowexecutions(workflowId);

    if(!executions){
        return <div className=""> No data</div>
    }

    return (
        <pre>
            {JSON.stringify(executions, null, 4)}
        </pre>
    )

}
