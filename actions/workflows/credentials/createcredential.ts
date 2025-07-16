"use server"

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createCredentialSchema, type createCredentialSchemaType } from "schema/credentials";
import { symmetricEncrypt } from "~/lib/encryption";
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



    const credential = await prisma.credential.create({
        data: {
            userId,
            name: data.name,
            value: encryptedValue,
        },
    });

    if (!credential) {
        throw new Error("Failed to create credential");
    }


    revalidatePath("/credentials");
}