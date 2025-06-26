'use client'

import { CoinsIcon, CopyIcon, Grip, GripVerticalIcon, TrashIcon } from "lucide-react"
import { Copse } from "next/font/google"
import type { TaskType } from "types/task"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { TaskRegistry } from "~/lib/workflow/task/registry"
import { useReactFlow } from "@xyflow/react"
import type { AppNodes } from "types/appNode"
import { CreateFlowNode } from "~/lib/workflow/CreateFlowNode"


function NodeHeader({taskType, nodeId} : {taskType: TaskType, nodeId: string}) {

    const task = TaskRegistry[taskType]
    const {deleteElements, getNode, addNodes} = useReactFlow()

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
                {!task.isEntryPoint && (
                    <>
                    <Button 
                        onClick={() => deleteElements({
                            nodes: [{id : nodeId}]
                        })} 
                        variant={"ghost"} 
                        size={"icon"}
                    >
                        <TrashIcon size={12} />
                    </Button>
                    <Button 
                        variant={"ghost"} 
                        size={"icon"}
                        onClick={() => {
                            const node = getNode(nodeId) as AppNodes
                            const newX = node.position.x + 60
                            const newY = node.position.y + 60
                            const newNode = CreateFlowNode(node.data.type, {
                                x: newX,
                                y: newY,
                            });
                            addNodes([newNode]);
                            
                        }}
                    >
                        <CopyIcon size={12} />
                    </Button>
                    </>
                )}
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