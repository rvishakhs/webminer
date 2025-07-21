"use client"

import type { LucideIcon } from 'lucide-react';
import { AwardIcon, CirclePlayIcon, CircleXIcon } from 'lucide-react';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { cn } from '~/lib/utils';

interface Props {
    title: string;
    value: number;
    icon: keyof typeof iconMap
}

const iconMap = {
    CirclePlayIcon,
    AwardIcon,
    CircleXIcon
};



function StatusCard(props : Props) {

    const Icon = iconMap[props.icon];

  return (
    <Card className='relative overflow-hidden'>
        <CardHeader className='flex pb-2'>
            <CardTitle>{props.title}</CardTitle>
            <Icon 
                size={120} 
                className={cn('text-muted-foreground absolute -bottom-4 -right-8 stroke-primary opacity-15', props.icon === 'CircleXIcon' && 'stroke-destructive')}
            />
        </CardHeader>
        <CardContent>
            <div className={cn('text-2xl font-bold text-primary', props.icon === 'CircleXIcon' && 'text-destructive/80')}>
                {props.value}
            </div>
        </CardContent>
    </Card>
  )
}

export default StatusCard
