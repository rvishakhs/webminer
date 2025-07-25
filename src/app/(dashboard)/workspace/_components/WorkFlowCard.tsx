"use client";

import type { Workflow } from '@prisma/client';
import { ChevronRight, ClockIcon, CornerDownRightIcon, FileTextIcon, MoreVerticalIcon, PlayIcon, ShuffleIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { WorkFlowExecutionStatus, WorkflowStatus } from 'types/workflow';
import TooltipWrapper from '~/components/TooltipWrapper';
import { Button, buttonVariants } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { cn } from '~/lib/utils';
import DeleteWorkflowDialogue from './DeleteWorkflowDialogue';
import RunBtn from '~/app/workspace/_components/RunBtn';
import SchedulerDialog from './SchedulerDialog';
import ExecutionStatusIndicator from '~/app/workspace/runs/[workflowId]/ExecutionstatusIndicator';
import { format, formatDistanceToNow } from 'date-fns';
import DuplicateWorkFlowDialogue from './DuplicateWorkFlowDialogue';

const statusColors = {
    [WorkflowStatus.DRAFT]: 'bg-yellow-300 text-yellow-600', 
    [WorkflowStatus.PUBLISHED]: 'bg-primary',
    [WorkflowStatus.ARCHIVED]: 'bg-gray-100 text-gray-800',
}

function WorkFlowCard( {workflow}: {workflow: Workflow}) {

    const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (
    <Card className='border border-separate shadow-sm rounded-lg overflow-hidden 
    hover:shadow-md dark:shadow-primary/30 group/card'>
        <CardContent className='p-4 flex items-center justify-between h-[100px'>
            <div className='flex items-center justify-end space-x-3'>
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", statusColors[workflow.status as WorkflowStatus])}>
                    {isDraft ? (<FileTextIcon className='h-5 w-5' />) : (<PlayIcon className='h-5 w-5' />)}
                </div>
                <div>
                    <h3 className='text-base font-bold text-muted-foreground flex items-center'>
                        <TooltipWrapper content={workflow.description}>
                            <Link
                                href={`/workspace/editor/${workflow.id}`}
                                className='flex items-center hover:underline'>
                                    {workflow?.name || "Untitled Workflow"}
                            </Link>
                        </TooltipWrapper>
                        {isDraft && (
                            <span className='ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-200 text-yellow-800 rounded-full'>
                                Draft
                            </span>
                        )}
                        <DuplicateWorkFlowDialogue workflowId={workflow.id} />
                    </h3>
                    <WorkFlowScheduler isDraft={isDraft} workflowId={workflow.id} cron={workflow.cron}/>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                {!isDraft && <RunBtn workflowId={workflow.id} />}
                <Link
                    href={`/workspace/editor/${workflow.id}`}
                    className={cn(buttonVariants({
                        variant: "outline",
                        size: "sm",
                        
                    }),
                    "flex items-center gap-2 "
                )}
                >
                    <ShuffleIcon size={16}/> Edit
                </Link>
                <WorkFlowActions 
                    workflowName={workflow.name}
                    workflowId={workflow.id}
                />
            </div>
        </CardContent>
        {!isDraft && (
            <LastRunDetails workflow={workflow}/>
        )}
        
    </Card>
  )
}

function WorkFlowActions({workflowName, workflowId} : {workflowName: string, workflowId: string }) {

    const [showDelete, setShowDelete] = React.useState(false);

    return (
        <>
        <DeleteWorkflowDialogue 
            open={showDelete} 
            setOpen={setShowDelete} 
            workflowName={workflowName} 
            workflowId={workflowId}
        />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={"sm"}>
                    <TooltipWrapper content={"More Actions"} >
                        <div className="flex items-center justify-center w-full h-full">
                            <MoreVerticalIcon size={18} />
                        </div>
                    </TooltipWrapper>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => setShowDelete((prev) => !prev)} className='text-destructive flex items-center gap-2 cursor-pointer'>
                    <TrashIcon  size={16} className='text-destructive' />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    );
}

function WorkFlowScheduler({isDraft, workflowId, cron}: {isDraft?: boolean, workflowId: string, cron: string}) {

    if (isDraft) return null;

    return (
        <div className='flex items-center gap-2'>
            <CornerDownRightIcon  className='w-4 h-4 text-muted-foreground'/>
            <SchedulerDialog workflowId={workflowId} cron={cron} key={`${cron}-${workflowId}`}/>
        </div>
    )
}

function LastRunDetails({workflow}: {workflow: Workflow}) {
    const {lastRunAt, lastRunStatus, lastRunId, nextRunAt} = workflow;
    const formattedStartedAt = lastRunAt && formatDistanceToNow(lastRunAt, { addSuffix: true})

    const nextSchedule = nextRunAt && format(nextRunAt, 'yyyy-MM-dd HH:mm:ss');

    return (
        <div className="bg-primary/8 px-4 py-4 flex justify-between items-center text-muted-foreground">
            <div className='flex items-center text-sm gap-2'>
                {lastRunAt && (
                    <Link href={`/workspace/runs/${workflow.id}/${lastRunId}`} className='flex items-center gap-2 text-sm group font-medium'>
                        <span>Last Run:</span>
                        <ExecutionStatusIndicator
                            status={lastRunStatus as WorkFlowExecutionStatus}
                        />
                        <span>{lastRunStatus}</span>
                        <span>{formattedStartedAt}</span>
                        <ChevronRight size={14} className='transform transition-all duration-300 translate-x-[2px] group-hover:translate-x-0 group-hover:rotate-90'/>
                    </Link>
                )}

                {!lastRunAt && (
                    <p className="text-sm font-medium">No runs yet</p>
                )}
            </div>
            {nextRunAt && (
                <div className='flex items-center gap-1 text-xs text-muted-foreground font-medium'>
                    <ClockIcon size={14} className='text-muted-foreground inline-block mr-1' />
                    <span className='text-sm'>Next Run:</span>
                    <span className='text-sm'>{nextSchedule}</span>
                </div>
            )}
        </div>
    )
}

export default WorkFlowCard