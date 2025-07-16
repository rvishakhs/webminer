'use client';

import { Layers2Icon, Loader2, ShieldEllipsisIcon } from 'lucide-react';
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
import { createCredentialSchema, type createCredentialSchemaType } from 'schema/credentials';
import { CreateCredential } from 'actions/workflows/credentials/createcredential';

function CreateCredentialDialogue({ triggerText }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);

  const form = useForm<createCredentialSchemaType>({
    resolver: zodResolver(createCredentialSchema),
    defaultValues: {
      name: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateCredential, 
    onSuccess: () => {
      toast.success("Credentials created successfully!", {id: 'create-credential-success'});
      
    },
    onError: (error) => {
      toast.dismiss('create-credentials-loading'); // Dismiss the loading toast
      toast.error("Failed to create credentials. Please try again.", {id: 'create-credentials-error'});
      // Handle error appropriately, e.g., show a toast notification
    }
  })
 
  const onSubmit = useCallback((values: createCredentialSchemaType) => {
    toast.loading("Creating workflow...", {id: 'create-credentials-loading'});
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
          {triggerText ?? 'Create Credentials'}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={ShieldEllipsisIcon}
          tittle="Create New Credentials"

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
                      Enter a unique name for the credentials.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Value
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input className='resize-none' {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the value for the credentials. this will be encrypted and stored securely.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type="submit" className='w-full hover:bg-primary/90 cursor-pointer '>
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

export default CreateCredentialDialogue;
