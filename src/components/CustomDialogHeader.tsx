'use client'

import React from 'react'
import { DialogHeader, DialogTitle } from './ui/dialog';
import type { LucideIcon } from 'lucide-react';
import { cn } from '~/lib/utils';

interface Props {
    tittle?: string;
    subTitle?: string;
    icon?: LucideIcon

    iconClassName?: string;
    tittleClassName?: string;
    subTitleClassName?: string;
}

function CustomDialogHeader(props : Props) {

    const Icon = props.icon;
  return (
        <DialogHeader className='py-6'>
            <DialogTitle asChild>
                <div className='flex flex-col items-center gap-2 mb-2'>
                    {Icon && <Icon size={30} className={cn("stroke-primary", props.iconClassName)} />}
                </div>
            </DialogTitle>
        </DialogHeader>
  )
}

export default CustomDialogHeader