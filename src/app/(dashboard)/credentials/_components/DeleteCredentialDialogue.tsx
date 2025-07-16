'use client'

import { useMutation } from '@tanstack/react-query';
import { deletecredentials } from 'actions/workflows/credentials/deletecredentials';
import { deleteWorkFlows } from 'actions/workflows/deleteWorkFlows';
import { icons, XCircleIcon } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

interface Props {
    name: string;
}


function DeleteCredentialswDialogue({name} : Props) {
    const [open, setOpen] = React.useState(false);
    const [confirmText, setConfirmText] = React.useState("");
    const deleteMutation = useMutation({
        mutationFn: deletecredentials,
        onSuccess: () => {
            toast.success("Credentials deleted successfully!", {id: name });
            setConfirmText("");
        },
        onError: () => {
            toast.error("Failed to delete credentials. Please try again.", {id: name});
            console.error("Error deleting credentials");
        }
    })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
            <Button 
                variant={"destructive"} size={"icon"} 
                className='hover:bg-red-500/60 cursor-pointer' 
            >
                <XCircleIcon className='h-4 w-4' />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this Credentials?</AlertDialogTitle>
                <AlertDialogDescription className='justify-around'>
                    If you delete this workflow, it will be permanently removed and cannot be recovered.
                    <div className="flex flex-col py-4 gap-2">
                        <p>
                            If you are sure,  enter <span className='text-destructive font-bold gap-1'>{name}</span> to confirm:
                        </p>
                        <Input 
                            className='border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 selection:bg-red-500'
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}

                        />
                    </div>
                </AlertDialogDescription>

            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirmText("")}>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                    className='bg-red-500 hover:bg-red-500/60' 
                    disabled={confirmText !== name || deleteMutation.isPending}
                    onClick={(e) => {
                        e.stopPropagation();
                        toast.loading("Deleting Credentials...", {id: name});
                        deleteMutation.mutate(name)
                    }}

                >Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
)}

export default DeleteCredentialswDialogue