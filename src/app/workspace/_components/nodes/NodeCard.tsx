"use client";

import React from 'react'
import { cn } from '~/lib/utils';
import { useReactFlow } from '@xyflow/react';

function NodeCard({
    children,
    nodeid,
    isSelected
    } : {
        children: React.ReactNode, 
        nodeid: string,
        isSelected: boolean
    }) {

    const {getNode, setCenter} = useReactFlow();

  return (
    <div 
        onDoubleClick={() => {
            const node = getNode(nodeid);
            if (!node) return;
            const {position, measured} = node;
            if (!measured || !position) return;
            const {width, height} = measured;
            const x = position.x + width! / 2
            const y = position.y + height! / 2

            setCenter(x, y, {
                zoom: 1.5,
                duration: 500,
                
            });

        }}
        className={cn(
            "rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col", 
            isSelected && "border-primary/40 shadow-md",
            )}
            >
            {children}
    </div>
  )
}

export default NodeCard
