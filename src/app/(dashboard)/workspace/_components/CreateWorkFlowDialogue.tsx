'use client';

import { Layers2Icon } from 'lucide-react';
import { useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import { createWorkflowSchema } from 'schema/workflow';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomDialogHeader from '~/components/CustomDialogHeader';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';

function CreateWorkFlowDialogue({triggerText} : {triggerText?: string}) {
    const [open, setOpen] = useState(false);

  // const form = useForm
  const form = useForm<z.infer<typeof createWorkflowSchema>>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });


  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button>
                {triggerText ?? "Create Workflow"}
            </Button>
        </DialogTrigger>
        <DialogContent className='px-0'>
          <CustomDialogHeader 
            icon={Layers2Icon}
            tittle="Create a New Workflow"
            subTitle="Fill in the details below to create a new workflow."
          />
          
          <div className="p-6">
            <Form {...form}>
                  <form className="space-y-8">
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
                  </form>
                </Form>
          </div>

        </DialogContent>
    </Dialog>
  )
}


export default CreateWorkFlowDialogue;