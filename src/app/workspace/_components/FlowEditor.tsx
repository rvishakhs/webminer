'use client'

import type { Workflow } from '@prisma/client'
import React, { useCallback, useEffect } from 'react'
import {
    Background,
    BackgroundVariant,
    Controls,
    ReactFlow,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from '@xyflow/react'; 
import '@xyflow/react/dist/style.css';
import { CreateFlowNode } from '~/lib/workflow/CreateFlowNode';
import { TaskType } from 'types/task';
import NodeComponent from './nodes/NodeComponent';
import { AppNodes } from 'types/appNode';

const nodeTypes = {
    WebMinerNode: NodeComponent,
}

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = {padding : 1};



function FlowEditor({workflow} : {workflow: Workflow} ) {
    const [nodes, setNodes, onNodesChange] = useNodesState<AppNodes>([]) 
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const { setViewport } = useReactFlow();

    useEffect(() => {
        try {
            const flow = JSON.parse(workflow.definition);
            if (!flow) return;
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
            if(!flow.viewport) return;
            const {x = 0, y = 0, zoom = 1} = flow.viewport;
            setViewport({x, y, zoom});

        } catch (error) {
            throw new Error('Invalid workflow definition format error hits in useeffect: ' + error);
        }

    }, [workflow.definition, setNodes, setEdges, setViewport]) ;

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, [])

    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        const taskType = event.dataTransfer.getData("application/reactflow");
        if (typeof taskType !== undefined || !taskType) return;

        const newNodes = CreateFlowNode(taskType as TaskType);
        setNodes((nds) => nds.concat(newNodes));

    }, [])


  return (
    <main className='h-full w-full'>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView // Need to remove the fitView prop to avoid auto-fit on load
            proOptions={{ hideAttribution: true }}
            nodeTypes={nodeTypes}
            snapToGrid={true}
            snapGrid={snapGrid}
            fitViewOptions={fitViewOptions}
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            <Controls position='top-left' fitViewOptions={fitViewOptions}/>
            <Background variant={BackgroundVariant.Dots} gap={12}/>

        </ReactFlow>
    </main>
  )
}

export default FlowEditor