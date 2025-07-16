"use server"

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "~/lib/prisma";


export async function deletecredentials(name:string) {

    // check if user is authenticated
    const { userId } = await auth();
    if(!userId) {
        throw new Error("User not authenticated");
    }

    await prisma.credential.delete({
        where: {
            userId_name: {
                userId: userId,
                name: name,
            }
        },

    })
    
    revalidatePath('/credentials');
    
}