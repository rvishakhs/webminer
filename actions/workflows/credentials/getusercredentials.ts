"use server"

import { auth } from "@clerk/nextjs/server";
import { prisma } from "~/lib/prisma";

export async function GetCredentialsForUser() {
    
    // check if user is authenticated
    const {userId} = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    return await prisma.Credential.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'asc',
        },
    })
}
