import {z} from 'zod';

export const createWorkflowSchema = z.object({
    name: z.string().max(50).min(3, "Minimum length is 3 characters"),
    description: z.string().max(200).optional(),
})

export type CreateWorkflowSchemaType = z.infer<typeof createWorkflowSchema>;

export const duplicateWorkflowSchema = createWorkflowSchema.extend({
    workflowId: z.string(),
})

export type duplicateWorkflowSchemaType = z.infer<typeof duplicateWorkflowSchema>;