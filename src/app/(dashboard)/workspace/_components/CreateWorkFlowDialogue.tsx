'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';

function CreateWorkFlowDialogue({triggerText} : {triggerText?: string}) {
    const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button>
                {triggerText ?? "Create Workflow"}
            </Button>
        </DialogTrigger>
        <DialogContent >

        </DialogContent>
    </Dialog>
  )
}

export default CreateWorkFlowDialogue
