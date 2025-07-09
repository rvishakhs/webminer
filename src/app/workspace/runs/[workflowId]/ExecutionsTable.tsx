'use client';

import { useQuery } from '@tanstack/react-query';
import { GetWorkflowexecutions } from 'actions/workflows/getWorkflowexecutions';
import React from 'react'

type InitialDataType = Awaited<ReturnType<typeof GetWorkflowexecutions>>;


function ExecutionsTable({workflowid, initialdata} : {workflowid: string, initialdata: InitialDataType}) {

    const query = useQuery({
        queryKey: ['executions', workflowid],
        initialdata,
        queryFn: () => GetWorkflowexecutions(workflowid),
        refetchInterval: 5000, // 5 seconds
    })
  return (
    <pre>
        {JSON.stringify(query.data, null, 4)}
    </pre>
  )
}

export default ExecutionsTable
