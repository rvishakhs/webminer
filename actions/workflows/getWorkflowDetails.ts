"use server"

import { auth } from "@clerk/nextjs/server";
import { prisma } from "~/lib/prisma";

export async function GetWorkflowDetails(phaseId: string) {
    console.log("GetWorkflowDetails function started."); // Add a log at the very start

    try {
        const { userId } = await auth();

        console.log("Fetching phase details for phaseId:", phaseId);
        console.log("Fetching phase details for userID:", userId);

        if (!userId) {
            // This will now be caught by the catch block if you want to handle it there
            throw new Error("User not authenticated");
        }

        return prisma.executionPhase.findUnique({
            where: {
                id: phaseId,
                userId: userId, // Ensure the phase belongs to the authenticated user
            }
        });

    } catch (error) {
        console.error("ERROR in GetWorkflowDetails:", error); // This will show any error in the SERVER terminal
        // Re-throw the error or return a structured error response
        return { error: "An error occurred while fetching workflow details." };
    }
}