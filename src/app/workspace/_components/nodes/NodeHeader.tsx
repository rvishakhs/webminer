'use client'

import { CoinsIcon, Grip, GripVerticalIcon } from "lucide-react"
import type { TaskType } from "types/task"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { TaskRegistry } from "~/lib/workflow/task/registry"


function NodeHeader({taskType} : {taskType: TaskType}) {

    const task = TaskRegistry[taskType]
  return (
    <div className="flex items-center gap-2 p-2">
        <task.icon size={16} />
        <div className="flex justify-between items-center w-full">
            <p className="text-xs font-bold uppercase text-muted-foreground">
                {task.label}
            </p>
            <div className="flex gap-2 items-center">
                {task.isEntryPoint && <Badge>Entry Point</Badge>}
                <Badge className="gap-1 flex items-center text-xs">
                    <CoinsIcon size={12} />
                    TODO

                </Badge>
                <Button 
                    variant="ghost"
                    size="icon"
                    className="drag-handle cursor-grabbing"
                >
                    <GripVerticalIcon size={16} />   
                </Button>
            </div>
        </div>
    </div>
  )
}

export default NodeHeader