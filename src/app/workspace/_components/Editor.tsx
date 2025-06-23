"use client"

import type { Workflow } from '@prisma/client'
import React from 'react'
import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
} from '@xyflow/react';
import FlowEditor from './FlowEditor';
import Topbar from './topbar/Topbar';

function Editor({workflow} : {workflow: Workflow} ) {
  return (
  <ReactFlowProvider>
        <div className="flex flex-col h-full w-full overflow-auto ">
          <Topbar 
            tittle="Workflow Editor" 
            subtittle={workflow.name}
            workflowId={workflow.id}
          />
            <section className='flex h-full overflow-auto'>
                <FlowEditor workflow={workflow} />
            </section>
        </div>
  </ReactFlowProvider>
  )
}

export default Editor;