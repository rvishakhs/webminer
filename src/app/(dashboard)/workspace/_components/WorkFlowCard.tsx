"use client";

import type { Workflow } from '@prisma/client';
import { FileTextIcon, MoreVerticalIcon, PlayIcon, ShuffleIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { WorkflowStatus } from 'types/workflow';
import TooltipWrapper from '~/components/TooltipWrapper';
import { Button, buttonVariants } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { cn } from '~/lib/utils';
import DeleteWorkflowDialogue from './DeleteWorkflowDialogue';

const statusColors = {
    [WorkflowStatus.DRAFT]: 'bg-yellow-300 text-yellow-600', 
    [WorkflowStatus.PUBLISHED]: 'bg-primary',
    [WorkflowStatus.ARCHIVED]: 'bg-gray-100 text-gray-800',
}

function WorkFlowCard( {workflow}: {workflow: Workflow}) {

    console.log("Workflow Card", workflow);

    const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (
    <Card className='border border-separate shadow-sm rounded-lg overflow-hidden 
    hover:shadow-md dark:shadow-primary/30'>
        <CardContent className='p-4 flex items-center justify-between h-[100px'>
            <div className='flex items-center justify-end space-x-3'>
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", statusColors[workflow.status as WorkflowStatus])}>
                    {isDraft ? (<FileTextIcon className='h-5 w-5' />) : (<PlayIcon className='h-5 w-5' />)}
                </div>
                <div>
                    <h3 className='text-base font-bold text-muted-foreground flex items-center'>
                        <Link
                            href={`/workspace/editor/${workflow.id}`}
                            className='flex items-center hover:underline'>
                                {workflow?.name || "Untitled Workflow"}
                        </Link>
                        {isDraft && (
                            <span className='ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-200 text-yellow-800 rounded-full'>
                                Draft
                            </span>
                        )}
                    </h3>
                </div>
            </div>
            <div className="flex items-center space-x-2">
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

export default WorkFlowCard