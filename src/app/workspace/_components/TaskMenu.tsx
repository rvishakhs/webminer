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
        <Accordion type='multiple' className='w-full ' defaultValue={['extraction']}>
            <AccordionItem value="extraction">
                <AccordionTrigger className="font-bold">
                    Data Extraction
                </AccordionTrigger>
                <AccordionContent className='flex flex-col gap-1'>
                    <TaskmenuBtn taskType={TaskType.PAGE_TO_HTML}/>

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