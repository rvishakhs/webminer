import { useContext } from "react";
import { FlowValidationContext } from "~/components/context/FlowValidation";

export default function useFlowValidation() {
    const context = useContext(FlowValidationContext);
    if (!context) {
        throw new Error("useFlowValidation must be used within a FlowValidationContextProvider");
    }

    return context;
}