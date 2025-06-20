'use client'

import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '~/components/ui/alert-dialog'
import { Input } from '~/components/ui/input';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    workflowName: string;
}


function DeleteWorkflowDialogue({open, setOpen, workflowName} : Props) {

    const [confirmText, setConfirmText] = React.useState("");

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this workflow?</AlertDialogTitle>
                <AlertDialogDescription className='justify-around'>
                    If you delete this workflow, it will be permanently removed and cannot be recovered.
                    <div className="flex flex-col py-4 gap-2">
                        <p>
                            If you are sure,  enter <span className='text-destructive font-bold gap-1'>{workflowName}</span> to confirm:
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
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-red-500 hover:bg-red-500/60' disabled={confirmText !== workflowName}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
)}

export default DeleteWorkflowDialogue