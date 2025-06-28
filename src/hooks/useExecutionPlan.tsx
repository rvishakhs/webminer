import {useReactFlow} from '@xyflow/react';
import { useCallback } from 'react';
import type { AppNodes } from 'types/appNode';
import { FlowToExecutionPlan, FlowToExecutionPlanValidationError } from '~/lib/workflow/ExecutionPlan';
import useFlowValidation from './useFlowValidation';
import { toast } from 'sonner';
import { se } from 'date-fns/locale';

const useExecutionPlan = () => {
    const {toObject} = useReactFlow();
    const {setInvalidInputs, clearErrors} = useFlowValidation();

    const handleError = useCallback((error: any) => {
        switch (error.type) {
            case FlowToExecutionPlanValidationError.No_ENTRY_POINT:
                toast.error('No entry point found in the workflow');
                break;
            case FlowToExecutionPlanValidationError.INVALID_INPUTS:
                toast.error('Invalid inputs found in the workflow');
                setInvalidInputs(error.isinvalidElements);
                break;
            default: 
                toast.error('An unexpected error occurred');
                break;

        }
    }, [setInvalidInputs]);

    const generateExecutionPlan = useCallback(() => {
        const {nodes, edges} = toObject();
        const {executionPlan, error} = FlowToExecutionPlan(nodes as AppNodes[], edges);

        if (error) {
            handleError(error);
            return null;
        }
        clearErrors();

        return executionPlan;
    }, [toObject, handleError, clearErrors]);

    return generateExecutionPlan;
};


export default useExecutionPlan;

