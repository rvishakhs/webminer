"use client";

import { useQuery } from '@tanstack/react-query';
import { GetWorkFlowExecutionWithPhases } from 'actions/workflows/getWorkFlowExecutionWithPhases';
import { formatDistanceToNow } from 'date-fns';
import { Calendar1Icon, CircleDashedIcon, type LucideIcon } from 'lucide-react';
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
    <div className="flex w-full h-full">
        <aside className='w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden'>
            <div className='py-4 px-2'>
                <Executionlabel
                    icon={CircleDashedIcon}
                    label="Status"
                    value={query.data?.status}
                />
                <Executionlabel
                    icon={Calendar1Icon}
                    label="Started at"
                    value={query.data?.startedAt ? formatDistanceToNow(new Date(query.data?.startedAt), {
                            addSuffix: true,
                        })
                         : "-"}
                />
            </div>  
        </aside>
    </div>
  )
}

export default ExecutionViewer

function Executionlabel({
    icon,
    label,
    value
}: {
    icon: LucideIcon
    label: React.ReactNode;
    value: React.ReactNode;
}) {

    const Icon = icon;

    return (
        <div className='flex justify-between items-center py-2 px-4 text-sm'>
            <div className="text-muted-foreground flex items-center gap-2">
                <Icon size={20} 
                    className="stroke-muted-foreground/80"
                />
                <span>{label}</span>
            </div>
            <div className="font-semibold capitalize flex gap-2 items-center">
                {value}
            </div>
        </div>
)
}