"use client"

import { useMutation } from '@tanstack/react-query'
import { RunWorkflow } from 'actions/workflows/runWorkflow'
import { Download, PlayIcon, Upload, UploadCloud } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import useExecutionPlan from '~/hooks/useExecutionPlan'
import { useReactFlow } from '@xyflow/react'
import { useRouter } from 'next/navigation'
import { publishWorkFlow } from 'actions/workflows/publishWorkFlow'
import { unpublishWorkFlow } from 'actions/workflows/unpublishWorkFlow'

function UnPublishBtn({ workflowId }: { workflowId: string }) {
    const generte = useExecutionPlan()
    const router = useRouter();

    const { toObject } = useReactFlow();

    const mutation = useMutation({
        // mutationKey: ['run-workflow', workflowId],
        mutationFn: unpublishWorkFlow,
        onSuccess: (data) => {
            toast.success(data.message, {id: workflowId})
            router.push(data.redirectUrl)
        },
        onError: (error) => {
            console.error("Error executing workflow:", {id: workflowId} , error);
        },
    })

  return (
    <Button 
        variant={"outline"}
        disabled={mutation.isPending}
        className='flex items-center gap-2'
        onClick={() => {
            toast.loading("Unpublishing workflow...", {id: workflowId})
            mutation.mutate(workflowId)
        }}
    >
        <Download size={16} className='stroke-orange-400'/>
        Unpublish  
    </Button>
  )
}

export default UnPublishBtn