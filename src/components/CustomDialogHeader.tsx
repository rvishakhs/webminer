'use client'

import React from 'react'
import { DialogHeader, DialogTitle } from './ui/dialog';

interface Props {
    tittle?: string;
    subTitle?: string;
    icon?: string | React.ComponentType<any>;

    iconClassName?: string;
    tittleClassName?: string;
    subTitleClassName?: string;
}

function CustomDialogHeader(props : Props) {
  return (
    <DialogHeader className='py-6'>
        <DialogTitle asChild>
            <div className='flex flex-col items-center gap-2 mb-2'></div>
        </DialogTitle>
    </DialogHeader>
  )
}

export default CustomDialogHeader