import type { LucideProps } from "lucide-react";
import type { TaskParam, TaskType } from "./task";
import type { AppNodes } from "./appNode";

export enum WorkflowStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived",
}

export type WorkflowTask = {
    label: string;
    icon: React.FC<LucideProps>;
    type: TaskType;
    isEntryPoint?: boolean;
    inputs: TaskParam[];
    outputs: TaskParam[];

}

export type WorkFlowExecutionPlanPhase = {
    phase: number;
    nodes: AppNodes[];
};

export type WorkFlowExecutionPlan = WorkFlowExecutionPlanPhase[];
