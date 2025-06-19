'use client'

import React from 'react'
import { DialogHeader, DialogTitle } from './ui/dialog';
import type { LucideIcon } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Separator } from './ui/separator';

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
                    {props.tittle && (
                        <p className={cn("text-xl font-semibold text-primary", props.tittleClassName)}>{props.tittle}</p>
                    )}
                    {props.subTitle && (
                        <p className={cn("text-sm font-normal text-muted-foreground", props.subTitleClassName)}>{props.subTitle}</p>
                    )}
                </div>
            </DialogTitle>
            <Separator />
        </DialogHeader>
  )
}

export default CustomDialogHeader