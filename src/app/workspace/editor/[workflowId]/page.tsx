import { auth } from '@clerk/nextjs/server';
import React from 'react'
import { waitFor } from '~/lib/helper/waitFor';
import { prisma } from '~/lib/prisma';
import Editor from '../../_components/Editor';

async function page({params}: {params: {workflowId: string}}) {

    const { workflowId } = params;
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
            userId: userId
        }
    })

  return <Editor workflow={workflow} />
}

export default  page;