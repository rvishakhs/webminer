import { memo } from "react";
import type { NodeProps } from "@xyflow/react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import type { AppNodeData } from "types/appNode";

const NodeComponent = memo((props: NodeProps) => {
    const nodeData = props.data as AppNodeData;
    
    ;
    return <NodeCard nodeid={props.id} isSelected={!!props.selected}>
        <NodeHeader taskType={nodeData.type} />
        </NodeCard>;
})

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";