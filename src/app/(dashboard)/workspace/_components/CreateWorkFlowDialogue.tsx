'use client';

import { Layers2Icon, Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createWorkflowSchema, type CreateWorkflowSchemaType } from 'schema/workflow';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomDialogHeader from '~/components/CustomDialogHeader';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { CreateWorkFlow } from 'actions/workflows/createWorkflow';
import { toast } from 'sonner';
import { redirect } from "next/navigation"; 

function CreateWorkFlowDialogue({ triggerText }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkFlow, 
    onSuccess: (data) => {
      toast.success("Workflow created successfully!", {id: 'create-workflow-success'});
      toast.dismiss('create-workflow-loading');
      setTimeout(() => {
        redirect(`/workspace/editor/${data.data.id}`);
      }, 1000);
    },
    onError: (error) => {
      toast.dismiss('create-workflow-loading'); // Dismiss the loading toast
      toast.error("Failed to create workflow. Please try again.", {id: 'create-workflow-error'});
      console.error("Error creating workflow:", error);
      // Handle error appropriately, e.g., show a toast notification
    }
  })
 
  const onSubmit = useCallback((values: CreateWorkflowSchemaType) => {
    toast.loading("Creating workflow...", {id: 'create-workflow-loading'});
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
        <Button>
          {triggerText ?? 'Create Workflow'}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          tittle="Create a New Workflow"
          subTitle="Fill in the details below to create a new workflow."
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

export default CreateWorkFlowDialogue;
