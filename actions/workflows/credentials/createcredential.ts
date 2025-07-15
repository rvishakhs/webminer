"use server"

import { auth } from "@clerk/nextjs/server";
import { createCredentialSchema, type createCredentialSchemaType } from "schema/credentials";
import { prisma } from "~/lib/prisma";

export async function CreateCredential(form: createCredentialSchemaType) {

    const { success, data } = createCredentialSchema.safeParse(form);

    if (!success) {
        throw new Error("Invalid form data");
    }

    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    // Encrypt the value before storing it
    const encryptedValue = symmetricEncrypt(data.value); // Assuming you have a function to encrypt the value


    const credential = await prisma.Credential.create({
        data: {
            userId,
            name: data.name,
            value: data.value,
        },
    });

    if (!credential) {
        throw new Error("Failed to create credential");
    }

    return credential;

    
}