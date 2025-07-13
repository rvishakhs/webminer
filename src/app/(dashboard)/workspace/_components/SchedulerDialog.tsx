"use client"

import { DialogClose } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import { UpdateWorkflowCron } from 'actions/workflows/updateWorkflowCron'
import { AlarmClockPlus, Calendar, Clock2Icon, FileQuestionIcon, HelpCircleIcon, TriangleAlertIcon, Workflow } from 'lucide-react'
import React, { useEffect } from 'react'
import { toast } from 'sonner'
import CustomDialogHeader from '~/components/CustomDialogHeader'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { cn } from '~/lib/utils'
import cronstrue from 'cronstrue';
import { set } from 'date-fns'
import { Tooltip } from 'recharts'
import TooltipWrapper from '~/components/TooltipWrapper'
import CronExpressionParser from 'cron-parser'

function SchedulerDialog(props: {cron: string | null,  workflowId: string }) {

    const [cron, setCron ] = React.useState(props.cron || "")
    const [validCron, setvalidCron ] = React.useState<boolean>(false)
    const [humanCronstring, sethumanCronstring ] = React.useState<string>("")

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



    useEffect(() => {
        try {
            CronExpressionParser.parse(cron, {tz: 'UTC'})
            const humanCronStr = cronstrue.toString(cron!);
            setvalidCron(true);
            sethumanCronstring(humanCronStr);
        } catch (error) {
            setvalidCron(false);
        }
    }, [cron])

    const workflowHasValidCron = props.cron && props.cron.length > 0;
    const readableSavedCron = workflowHasValidCron && cronstrue.toString(props.cron!);


  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button
                variant={"link"}
                size={"sm"}
                className={cn("text-sm p-0 h-auto cursor-pointer text-orange-400", workflowHasValidCron && "text-primary")}
            >

                {workflowHasValidCron && (
                    <div className="flex items-center gap-2 text-sm">
                        <Clock2Icon className='h-4 w-4'/>
                        {humanCronstring}
                    </div>
                )}

                {!workflowHasValidCron && (
                    <div className='flex items-center gap-1'>
                        <AlarmClockPlus className='w-4 h-4 '/>
                        Set schedule
                    </div>
                )}


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
                    value={cron!}
                    onChange={(e) => setCron(e.target.value)}
                />

                <div className={cn("bg-accent rounded-md p-4 border text-sm border-destructive text-destructive flex items-center justify-between", validCron && "border-primary text-primary")}>
                    {validCron ? humanCronstring : "Not a valid cron expression"}
                    <TooltipWrapper content={"E,g. Once a minute = 0 * * * * *, \nOnce a day at midnight = 0 0 0 * * *, Once an hour at the beginning of the hour = 0 0 * * * *"}>
                        <HelpCircleIcon className='h-5 w-5 text-amber-300'/>
                    </TooltipWrapper>
                </div>
            </div>

            <DialogFooter className='px-6 gap-2'>
                <div className='flex flex-col gap-2 w-full'>
                    <DialogClose asChild >
                        <Button 
                            className='w-full' 
                            disabled={mutation.isPending || !validCron}
                            onClick={() => {
                                toast.loading("Saving schedule..." , {id: "cron"})
                                mutation.mutate({
                                    id: props.workflowId,
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
