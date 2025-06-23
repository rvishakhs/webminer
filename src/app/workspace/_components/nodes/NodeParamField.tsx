'use client'

import React, { useCallback } from 'react'
import { TaskParamType, type TaskParam } from 'types/task'
import { Input } from '~/components/ui/input'
import StringParam from './param/StringParam'
import { useReactFlow } from '@xyflow/react'
import type { AppNodes } from 'types/appNode'
import BrowserInstanceParam from './param/BrowserInstanceParam '

function NodeParamField({params, nodeId} : {params: TaskParam, nodeId: string}) {
    const { updateNodeData, getNode } = useReactFlow()
    const node = getNode(nodeId) as AppNodes
    const value = node.data.inputs?.[params.name];

    const updateNodeParamValue = useCallback(
        (newValue: string) => {
            updateNodeData(nodeId, {
                inputs : {
                    ...node?.data.inputs,
                    [params.name]: newValue,
                },
            });
        },
        [nodeId, updateNodeData, params.name, node?.data.inputs]
    ); 

    switch (params.type) {
        case TaskParamType.STRING:
            return (
                <StringParam 
                    param={params} 
                    value={value} 
                    updateNodeParamValue={updateNodeParamValue}
                />
        );
        case TaskParamType.BROWSER_INSTANCE:
            return (
                <BrowserInstanceParam 
                    param={params} 
                    value={value} 
                    updateNodeParamValue={updateNodeParamValue}
                />
        );
        default:
            return (
              <div className='w-full'>
                <p className="text-xs text-muted-foreground">Not Implemented Yet</p>
              </div>
            )
    }
}

export default NodeParamField