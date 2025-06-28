import {useReactFlow} from '@xyflow/react';
import { useCallback } from 'react';
import type { AppNodes } from 'types/appNode';
import { FlowToExecutionPlan } from '~/lib/workflow/ExecutionPlan';

const useExecutionPlan = () => {
    const {toObject} = useReactFlow();

    const generateExecutionPlan = useCallback(() => {
        const {nodes, edges} = toObject();
        const {executionPlan} = FlowToExecutionPlan(nodes as AppNodes, edges);
        return executionPlan;
    }, [toObject]);

    return generateExecutionPlan;
};


export default useExecutionPlan;

