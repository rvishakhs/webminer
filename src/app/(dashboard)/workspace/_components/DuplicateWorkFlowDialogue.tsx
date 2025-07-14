'use client';

import { CopyIcon, Layers2Icon, Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createWorkflowSchema, duplicateWorkflowSchema, type CreateWorkflowSchemaType, type duplicateWorkflowSchemaType } from 'schema/workflow';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomDialogHeader from '~/components/CustomDialogHeader';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { redirect } from "next/navigation"; 
import { DuplicateWorkflow } from 'actions/workflows/duplicateworkflow';
import { cn } from '~/lib/utils';

function DuplicateWorkFlowDialogue({ workflowId }: { workflowId?: string }) {
  const [open, setOpen] = useState(false);

  const form = useForm<duplicateWorkflowSchemaType>({
    resolver: zodResolver(duplicateWorkflowSchema),
    defaultValues: {
      workflowId,

    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: DuplicateWorkflow, 
    onSuccess: () => {
      toast.success("Workflow duplicated successfully!", {id: 'duplicate-workflow-success'});
      toast.dismiss('duplicate-workflow-loading');
    },
    onError: (error) => {
      toast.dismiss('duplicate-workflow-loading'); // Dismiss the loading toast
      toast.error("Failed to duplicate workflow. Please try again.", {id: 'duplicate-workflow-error'});
      console.error("Error duplicating workflow:", error);
      // Handle error appropriately, e.g., show a toast notification
    }
  })
 
  const onSubmit = useCallback((values: duplicateWorkflowSchemaType) => {
    toast.loading("Creating workflow...", {id: 'duplicate-workflow-loading'});
    mutate(values);
    setOpen(false);
  },
   [mutate]
  );

  return (
    <Dialog open={open} onOpenChange={(open) => {
      form.reset();
      setOpen(open); 
    }}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size={"icon"} 
          className={cn("ml-2 transition-opacity duration-200 opacity-0 group-hover/card:opacity-100")}>
          <CopyIcon size={14} className='text-muted-foreground cursor-pointer'/>
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          tittle="Duplicate a New Workflow"
        />

        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a unique name for your workflow.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">(optional)</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className='resize-none' {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a brief description of what your workflow does.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type="submit" className='w-full hover:bg-primary/90 cursor-pointer'>
                {isPending && <Loader2 className='animate-spin' /> }
                {!isPending && "Proceed"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default  DuplicateWorkFlowDialogue;
