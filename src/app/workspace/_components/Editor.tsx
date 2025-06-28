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
import TaskMenu from './TaskMenu';
import { FlowValidationContext, FlowValidationContextProvider } from '~/components/context/FlowValidation';

function Editor({workflow} : {workflow: Workflow} ) {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
            <div className="flex flex-col h-full w-full overflow-auto ">
              <Topbar 
                tittle="Workflow Editor" 
                subtittle={workflow.name}
                workflowId={workflow.id}
                />
                <section className='flex h-full overflow-auto'>
                  <TaskMenu />
                  <FlowEditor workflow={workflow} />
                </section>
            </div>
      </ReactFlowProvider> 
    </FlowValidationContextProvider>
  )
}

export default Editor;