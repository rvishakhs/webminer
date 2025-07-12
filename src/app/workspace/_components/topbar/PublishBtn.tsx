"use client"

import { useMutation } from '@tanstack/react-query'
import { RunWorkflow } from 'actions/workflows/runWorkflow'
import { PlayIcon, Upload } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import useExecutionPlan from '~/hooks/useExecutionPlan'
import { useReactFlow } from '@xyflow/react'
import { useRouter } from 'next/navigation'
import { publishWorkFlow } from 'actions/workflows/publishWorkFlow'

function PublishBtn({ workflowId }: { workflowId: string }) {
    const generte = useExecutionPlan()
    const router = useRouter();

    const { toObject } = useReactFlow();

    const mutation = useMutation({
        // mutationKey: ['run-workflow', workflowId],
        mutationFn: publishWorkFlow,
        onSuccess: (data) => {
            toast.success(data.message, {id: workflowId})
            router.push(data.redirectUrl)
        },
        onError: (error, data) => {
            toast.warning(data.message)
            console.error("Error executing workflow:", {id: workflowId} , error);
        },
    })

  return (
    <Button 
        variant={"outline"}
        disabled={mutation.isPending}
        className='flex items-center gap-2'
        onClick={() => {
            const plan = generte();
            if (!plan) {
                toast.error("Execution plan is not generated", {id: "flow-execution"});
                return;
            }
            toast.loading("Publishing workflow...", {id: workflowId})
            mutation.mutate({
                id: workflowId,
                definition : JSON.stringify(toObject())
            })
        }}
    >
        <Upload size={16} className='stroke-green-400'/>
        Publish  
    </Button>
  )
}

export default PublishBtn