"use client"; 


import  ReactNode  from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface Props {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

function TooltipWrapper(props: Props) {

  if(!props.content) return props.children;
  return (
    <TooltipProvider delayDuration={0}>
        <Tooltip >
            <TooltipTrigger asChild>{props.children}</TooltipTrigger>
            <TooltipContent side={props.side} >{props.content}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipWrapper