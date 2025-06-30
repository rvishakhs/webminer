"use client"

import { useMutation } from '@tanstack/react-query'
import { RunWorkflow } from 'actions/workflows/runWorkflow'
import { PlayIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import useExecutionPlan from '~/hooks/useExecutionPlan'
import { useReactFlow } from '@xyflow/react'
import { useRouter } from 'next/navigation'

function ExecuteBtn({ workflowId }: { workflowId: string }) {
    const generte = useExecutionPlan()
    const router = useRouter();

    const { toObject } = useReactFlow();

    const mutation = useMutation({
        mutationFn: RunWorkflow,
        onSuccess: (data) => {
            toast.success("Workflow executed successfully!", {id: "flow-execution"})
            router.push(data.redirectUrl)
        },
        onError: (error) => {
            console.error("Error executing workflow:", {id: "flow-execution"});
        },
    })

  return (
    <Button 
        variant={"outline"}
        disabled={mutation.isPending}
        className='flex items-center gap-2'
        onClick={() => {
            const plan = generte();
            console.log("Execution Plan:", plan);
            if (!plan) {
                toast.error("Execution plan is not generated", {id: "flow-execution"});
                return;
            }
            mutation.mutate({
                workflowId,
                flowDefinition: JSON.stringify(toObject())
            })
        }}
    >
        <PlayIcon size={16} className='stroke-amber-400'/>
        Execute  
    </Button>
  )
}

export default ExecuteBtn