import { memo } from "react";
import type { NodeProps } from "@xyflow/react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import type { AppNodeData } from "types/appNode";
import { TaskRegistry } from "~/lib/workflow/task/registry";
import { NodeInput, NodeInputs } from "./NodeInput";

const NodeComponent = memo((props: NodeProps) => {
    const nodeData = props.data as AppNodeData;
    const task = TaskRegistry[nodeData.type]

    ;
    return <NodeCard nodeid={props.id} isSelected={!!props.selected}>
        <NodeHeader taskType={nodeData.type} />
        <NodeInputs>
            {task.inputs.map((input) => (
                <NodeInput key={input.name} input={input} />
            ))}
        </NodeInputs>
        </NodeCard>;
})

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";