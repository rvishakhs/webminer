"use client"

import { useMutation } from '@tanstack/react-query'
import { RunWorkflow } from 'actions/workflows/runWorkflow'
import router from 'next/router'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'

function RunBtn({workflowId}: {workflowId: string}) {

    const mutattion = useMutation({
        mutationFn: RunWorkflow,
        onSuccess: (data) => {
            toast.success("Workflow executed successfully!", {id: workflowId})
            router.push(data.redirectUrl)},
        onError: (error) => {
            console.error("Error executing workflow:", {id: workflowId} , error);
        },
    })
  return (
    <Button
        variant={"outline"}
        disabled={mutattion.isPending}
        className='flex items-center gap-2'
        size={"sm"}
        onClick={() => {
            toast.loading("Running workflow...", {id: workflowId})
            mutattion.mutate({
                workflowId,
            })
        }}
    >
        Run        
    </Button>
  )
}

export default RunBtn
