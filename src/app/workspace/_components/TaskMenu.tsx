"use client"

import { eventNames } from 'process'
import React from 'react'
import { TaskType } from 'types/task'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'
import { Button } from '~/components/ui/button'
import { TaskRegistry } from '~/lib/workflow/task/registry'

function TaskMenu() {
  return (
    <aside className='w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto'>
        <Accordion type='multiple' className='w-full ' defaultValue={['extraction', 'Interactions', 'timing', 'Results', 'Data_Storage']}>
            <AccordionItem value="Interactions">
                <AccordionTrigger className="font-bold">
                    User Interactions
                </AccordionTrigger>
                <AccordionContent className='flex flex-col gap-1'>
                    <TaskmenuBtn taskType={TaskType.FILL_INPUT}/>
                    <TaskmenuBtn taskType={TaskType.CLICK_ELEMENT}/>
                    <TaskmenuBtn taskType={TaskType.NAVIGATE_TO_URL}/>
                    <TaskmenuBtn taskType={TaskType.SCROLL_TO_ELEMENT}/>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="extraction">
                <AccordionTrigger className="font-bold">
                    Data Extraction
                </AccordionTrigger>
                <AccordionContent className='flex flex-col gap-1'>
                    <TaskmenuBtn taskType={TaskType.PAGE_TO_HTML}/>
                    <TaskmenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT}/>
                    <TaskmenuBtn taskType={TaskType.EXTRACT_DATA_WITH_AI}/>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="timing">
                <AccordionTrigger className="font-bold">
                    Flow Timing Control
                </AccordionTrigger>
                <AccordionContent className='flex flex-col gap-1'>
                    <TaskmenuBtn taskType={TaskType.WAIT_FOR_ELEMENT}/>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Data_Storage">
                <AccordionTrigger className="font-bold">
                    Data Storage
                </AccordionTrigger>
                <AccordionContent className='flex flex-col gap-1'>
                    <TaskmenuBtn taskType={TaskType.READ_PROPERTY_FROM_JSON}/>
                    <TaskmenuBtn taskType={TaskType.ADD_PROPERTY_TO_JSON}/>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Results">
                <AccordionTrigger className="font-bold">
                    Results 
                </AccordionTrigger>
                <AccordionContent className='flex flex-col gap-1'>
                    <TaskmenuBtn taskType={TaskType.DELIVER_VIA_WEBHOOK}/>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </aside>
  )
}

function TaskmenuBtn({taskType} : {taskType: TaskType}) {
    const task = TaskRegistry[taskType]

    const onDragStart = (event: React.DragEvent, type: TaskType) => {
        event.dataTransfer.setData("application/reactflow", type);
        event.dataTransfer.effectAllowed = "move";
        console.log("onDragStart", event.dataTransfer.getData("application/reactflow"));
    }

    return (
        <Button 
            draggable 
            variant={"secondary"} 
            className='hover:bg-secondary/40 cursor-pointer flex justify-between items-center gap-2 border w-full'
            onDragStart={(event) => onDragStart(event, taskType)}
        > 
            <div className=" flex gap-2 items-center">
                <task.icon size={20} />
                {task.label}
            </div>
        </Button>
    )
}

export default TaskMenu