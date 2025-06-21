'use client'

import type { Workflow } from '@prisma/client'
import React from 'react'
import {
    Background,
    BackgroundVariant,
    Controls,
    ReactFlow,
    useEdgesState,
    useNodesState,
} from '@xyflow/react'; 
import '@xyflow/react/dist/style.css';
import { CreateFlowNode } from '~/lib/workflow/CreateFlowNode';
import { TaskType } from 'types/task';
import NodeComponent from './nodes/NodeComponent';

const nodeTypes = {
    WebMinerNode: NodeComponent,
}

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = {padding : 1};



function FlowEditor({workflow} : {workflow: Workflow} ) {
    const [nodes, setNodes, onNodesChange] = useNodesState([
        CreateFlowNode(TaskType.LAUNCH_BROWSER),
    ]) 
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

  return (
    <main className='h-full w-full'>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            proOptions={{ hideAttribution: true }}
            nodeTypes={nodeTypes}
            snapToGrid={true}
            snapGrid={snapGrid}
            fitViewOptions={fitViewOptions}
        >
            <Controls position='top-left' fitViewOptions={fitViewOptions}/>
            <Background variant={BackgroundVariant.Dots} gap={12}/>

        </ReactFlow>
    </main>
  )
}

export default FlowEditor