import {z} from 'zod';

export const createCredentialSchema = z.object({
    name: z.string().max(30).min(3, "Minimum length is 3 characters"),
    value: z.string().max(500, "Maximum length is 1000 characters"),
})

export type createCredentialSchemaType = z.infer<typeof createCredentialSchema>;