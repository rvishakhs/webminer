'use client';

import { Layers2Icon } from 'lucide-react';
import { useState } from 'react';
import CustomDialogHeader from '~/components/CustomDialogHeader';
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
        <DialogContent className='px-0'>
          <CustomDialogHeader 
            icon={Layers2Icon}
            tittle="Create a New Workflow"
            subTitle="Fill in the details below to create a new workflow."
          />
        </DialogContent>
    </Dialog>
  )
}

export default CreateWorkFlowDialogue
