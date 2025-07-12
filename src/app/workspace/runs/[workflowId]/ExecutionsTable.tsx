'use client';

import { useQuery } from '@tanstack/react-query';
import { GetWorkflowexecutions } from 'actions/workflows/getWorkflowexecutions';

import React from 'react'
import { Badge } from '~/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { DatesToDurationString } from '~/lib/helper/dates';
import ExecutionStatusIndicator from './ExecutionstatusIndicator';
import type { WorkFlowExecutionStatus } from 'types/workflow';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';


type InitialDataType = Awaited<ReturnType<typeof GetWorkflowexecutions>>;


function ExecutionsTable({workflowid, initialdata} : {workflowid: string, initialdata: InitialDataType}) {

    const router = useRouter()

    const query = useQuery({
        queryKey: ['executions', workflowid],
        initialdata,
        queryFn: () => GetWorkflowexecutions(workflowid),
        refetchInterval: 5000, // 5 secondssilly galootda
    })
  return (
    <div className="border rounded-lg shadow-md overflow-auto">
        <Table>
            <TableHeader>
                <TableRow className='bg-muted text-muted-foreground '>
                    <TableHead className='font-bold'>Id</TableHead>
                    <TableHead className='font-bold'>Status</TableHead>
                    <TableHead className='text-right text-xs text-muted-foreground font-bold'>Started at</TableHead>
                </TableRow>                
            </TableHeader>
            <TableBody className='gap-2 h-full overflow-auto'>
                {query.data?.map((execution) => {
                    const duration = DatesToDurationString(execution.completedAt, execution.startedAt);

                    const formattedStartedAt = execution.startedAt && formatDistanceToNow(execution.startedAt, {
                        addSuffix: true
                    })

                    return (
                        <TableRow 
                            key={execution.id} 
                            className='cursor-pointer'
                            onClick={() => {
                                router.push(`/workspace/runs/${workflowid}/${execution.id}`);
                            }}
                        >
                            <TableCell>
                                <div className='flex flex-col'>
                                    <span className='font-semibold'>{execution.id}</span>
                                    <div className='text-muted-foreground text-xs'>
                                        <span>
                                            Triggered Via
                                        </span>
                                        <Badge variant={"outline"}>
                                            {execution.trigger}
                                        </Badge>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='flex flex-col'>

                                    <div className='flex gap-2 items-center'>
                                    <ExecutionStatusIndicator status={execution.status as WorkFlowExecutionStatus}  />
                                    <span className='font-semibold capitalize'>{execution.status}</span>
                                    </div>
                                </div>
                                    <div className='text-muted-foreground text-xs mx-5'>
                                        {duration}
                                    </div>
                            </TableCell>
                            <TableCell className='text-right text-muted-foreground'>
                                {formattedStartedAt}
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>

        </Table>
    </div>
  )
}

export default ExecutionsTable
