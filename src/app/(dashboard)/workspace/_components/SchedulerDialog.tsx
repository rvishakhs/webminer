"use client"

import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { UpdateWorkflowCron } from 'actions/workflows/updateWorkflowCron'
import { Calendar, TriangleAlertIcon, Workflow } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import CustomDialogHeader from '~/components/CustomDialogHeader'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { cn } from '~/lib/utils'

function SchedulerDialog({ WorkflowId }: { WorkflowId: string }) {

    const [cron, setCron ] = React.useState<string>("")

    const mutation = useMutation({
        mutationFn: UpdateWorkflowCron,
        onSuccess: () => {
            toast.success("Workflow schedule updated successfully")
            setCron("")
        },
        onError: () => {
            toast.error("Failed to update workflow schedule. Please check the cron expression.")
        },
    })

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button
                variant={"link"}
                size={"sm"}
                className={cn("text-sm p-0 h-auto cursor-pointer  ")}
            >

                <div className='flex items-center gap-1'>
                    <TriangleAlertIcon className='w-3 h-4 mr-1 text-accent-foreground'/>
                    Set schedule
                </div>
            </Button>
        </DialogTrigger>
        <DialogContent className='px-0'>
            <CustomDialogHeader 
                tittle='Scheule Workflow Execution'
                subTitle='Set a cron schedule for your workflow execution'
                icon={Calendar}
            />

            <div className="p-4 gap-2 flex flex-col">
                <p className="text-muted-foreground text-sm">
                    Specify a cron expression to schedule your workflow execution.
                </p>
                <Input 
                    placeholder='E.g. * * * * * *'
                    value={cron}
                    onChange={(e) => setCron(e.target.value)}
                />
            </div>

            <DialogFooter className='px-6 gap-2'>
                <div className='flex flex-col gap-2 w-full'>
                    <DialogClose asChild >
                        <Button 
                            className='w-full' 
                            disabled={mutation.isPending}
                            onClick={() => {
                                toast.loading("Saving schedule..." , {id: "cron"})
                                mutation.mutate({
                                    id: WorkflowId,
                                    cron: cron
                                })
                            }}    
                        >
                            Save
                        </Button>
                    </DialogClose>
                    <DialogClose asChild >
                        <Button className='w-full' variant={"secondary"}>
                            Cancel
                        </Button>
                    </DialogClose>
                </div>

            </DialogFooter>

        </DialogContent>
    </Dialog>
  )
}

export default SchedulerDialog
