'use client'

import React, { useCallback } from 'react'
import { TaskParamType, type TaskParam } from 'types/task'
import { Input } from '~/components/ui/input'
import StringParam from './param/StringParam'
import { useReactFlow } from '@xyflow/react'
import type { AppNodes } from 'types/appNode'
import BrowserInstanceParam from './param/BrowserInstanceParam '
import SelectParam from './param/SelectParam'
import CredentialParam from './param/CredentialParam'

function NodeParamField({params, nodeId, disabled} : {params: TaskParam, nodeId: string, disabled: boolean}) {
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
                    disabled={disabled}
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
        case TaskParamType.SELECT:
            return (
                <SelectParam 
                    param={params} 
                    value={value} 
                    updateNodeParamValue={updateNodeParamValue}
                />
            )
        case TaskParamType.CREDENTIAL:
            return (
                <CredentialParam 
                    param={params} 
                    value={value} 
                    updateNodeParamValue={updateNodeParamValue}
                />
            )
        default:
            return (
              <div className='w-full'>
                <p className="text-xs text-muted-foreground">Not Implemented Yet</p>
              </div>
            )
    }
}

export default NodeParamField