"use client";

import { useQuery } from '@tanstack/react-query';
import { GetWorkFlowExecutionWithPhases } from 'actions/workflows/getWorkFlowExecutionWithPhases';
import React from 'react'
import { WorkFlowExecutionStatus } from 'types/workflow';

type ExecutionData = Awaited<ReturnType<typeof GetWorkFlowExecutionWithPhases>>;

function ExecutionViewer({ executiondata }: {excutiondata: ExecutionData}) {

    const query = useQuery({
        queryKey: ["execution", executiondata.id],
        executiondata,
        queryFn: () => GetWorkFlowExecutionWithPhases(executiondata.id),
        refetchInterval: (q) => 
            q.state.data?.status === WorkFlowExecutionStatus.RUNNING ? 1000 : false,    })

  return (
    <div>ExecutionViewer</div>
  )
}

export default ExecutionViewer