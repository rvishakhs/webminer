"use client";

import { useQuery } from '@tanstack/react-query';
import { GetWorkflowDetails } from 'actions/workflows/getWorkflowDetails';
import { GetWorkFlowExecutionWithPhases } from 'actions/workflows/getWorkFlowExecutionWithPhases';
import { formatDistanceToNow } from 'date-fns';
import { Calendar1Icon, CircleDashedIcon, ClockIcon, Loader, Loader2Icon, WorkflowIcon, type LucideIcon } from 'lucide-react';
import React from 'react'
import { WorkFlowExecutionStatus } from 'types/workflow';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { DatesToDurationString } from '~/lib/helper/dates';

type ExecutionData = Awaited<ReturnType<typeof GetWorkFlowExecutionWithPhases>>;

function ExecutionViewer({ executiondata }: {excutiondata: ExecutionData}) {

    const [selectedPhase, setSelectedPhase] = React.useState<string | null>(null);

    const query = useQuery({
        queryKey: ["execution", executiondata.id],
        executiondata,
        queryFn: () => GetWorkFlowExecutionWithPhases(executiondata.id),
        refetchInterval: (q) => 
            q.state.data?.status === WorkFlowExecutionStatus.RUNNING ? 1000 : false,    })

    const phaseDetails = useQuery({
        queryKey: ["phaseDeatils", selectedPhase],
         enabled: selectedPhase !== null,
        queryFn: () => GetWorkflowDetails(selectedPhase!),
    });
    

    const isRunning = query.data?.status === WorkFlowExecutionStatus.RUNNING;

    const duration = DatesToDurationString(
        query.data?.completedAt,
        query.data?.startedAt
    )

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
                    value={
                        <span className='lowercase'>
                            {query.data?.startedAt ? formatDistanceToNow(new Date(query.data?.startedAt), {
                                addSuffix: true,
                            })
                            : "-"}
                        </span>
                    }
                />
                <Executionlabel
                    icon={ClockIcon}
                    label="Duration"
                    value={duration ? (duration) : (<Loader2Icon className='animate-spin text-muted-foreground' size={16} />) }
                />
            </div>  
            <Separator />
            <div className='flex justify-center items-center px-4 py-2'>
                <div className='flex items-center gap-2 text-muted-foreground '>
                    <WorkflowIcon size={20} className='stroke-muted-foreground/80'/>
                    <span className='font-semibold'>Phases</span>
                </div>
            </div>
            <Separator />
            <div className="overflow-auto h-full px-2 py-4">
                {query.data?.phases.map((phase, index) => (
                    <Button
                        key={phase.id}
                        variant={selectedPhase === phase.id ? "secondary" : "ghost" }
                        className='w-full justify-between'
                        onClick={() => {
                            // if (isRunning) return; 
                            setSelectedPhase(phase.id)}
                        }
                     >
                        <div className='flex items-center gap-2'>
                            <Badge variant={"outline"}>{index + 1}</Badge>
                            <p className='font font-semibold'>{phase.name}</p>
                        </div>
                        <p className='text-xs text-muted-foreground'>{phase.status}</p>
                    </Button>
                ))}
            </div>
        </aside>
        <div className='flex w-full h-full'>
            <pre>
                {JSON.stringify(phaseDetails.data, null, 2)}
            </pre>

        </div>
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
            <div className="font-semibold capitalize flex gap-2 items-center text-xs">
                {value}
            </div>
        </div>
)
}

function GetWorkflowPhaseDetails(selectedPhase: string | null): any {
    throw new Error('Function not implemented.');
}
