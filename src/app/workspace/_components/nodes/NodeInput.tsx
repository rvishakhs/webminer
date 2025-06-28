import { Handle, Position, useEdges } from "@xyflow/react"
import type { TaskParam } from "types/task"
import { cn } from "~/lib/utils"
import NodeParamField from "./NodeParamField"
import { ColorForHandle } from "./common"
import useFlowValidation from "~/hooks/useFlowValidation"

export function NodeInputs({children} : {children: React.ReactNode}) {
    return (
        <div className="flex flex-col divide-y gap-2">
            {children}
        </div>
    )
}



export function NodeInput({input, nodeId} : {input : TaskParam, nodeId: string}) {

    const { invalidInputs} = useFlowValidation();

    const edges = useEdges();
    const isConnected = edges.some(
        (edge) => edge.target === nodeId && edge.targetHandle === input.name
    ); 

    const hasErrors = invalidInputs.find((node : any) => node.nodeId === nodeId)?.inputs.find((invalidInput : any) => invalidInput === input.name);

    return (
        <div className={cn("flex justify-start relative p-3 bg-secondary w-full ", 
            hasErrors && "bg-destructive/10"
        )}>
            <NodeParamField params={input} nodeId={nodeId} disabled={isConnected}/>
                {!input.hideHandle && (
                    <Handle 
                        id={input.name}
                        isConnectable={!isConnected}
                        type="target"
                        position={Position.Left}
                        className={cn("!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4", ColorForHandle[input.type])}
                    />
                )}
        </div>
    )
}

