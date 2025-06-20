

import { getWorkflowForUser } from 'actions/workflows/getWorkflowForUser'
import { AlertCircle, InboxIcon } from 'lucide-react'
import React, { Suspense } from 'react'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Skeleton } from '~/components/ui/skeleton'
import { waitFor } from '~/lib/helper/waitFor'
import dynamic from 'next/dynamic';
import CreateWorkFlowDialogue from './_components/CreateWorkFlowDialogue'
import WorkFlowCard from './_components/WorkFlowCard'
import type { Workflow } from '@prisma/client'

function page() {
  return (
    <div className='flex-1 flex flex-col h-full'>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className='text-3xl font-bold'>
            Workspace
          </h1>
          <p className="text-muted-foreground"> Manage your workflows</p>
        </div>
        <CreateWorkFlowDialogue />
        </div>
        <div className="h-full py-6">
          <Suspense fallback={<UserWorkFLowSkeleton />}>
            <UserWorkFlow />
          </Suspense>
      </div>
    </div>
  )
}

function UserWorkFLowSkeleton() {
  return (
    <div className="space-y-2">
      {[1,2,3,4].map((i) => (
        <Skeleton key={i} className='h-32 w-full' />
      ))}
    </div>
  )
}

async function UserWorkFlow() {
  
  const workflows = await getWorkflowForUser();

  if (!workflows) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className='w-6 h-6' />
        <AlertTitle>Error </AlertTitle>
        <AlertDescription>Error while loading user workslow please try again!</AlertDescription>
      </Alert>
    )
  }
  if (workflows.length === 0 ){
    return (
      <div className='flex flex-col items-center gap-4 justify-center h-full'>
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className='stroke-primary'/>
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold"> No Workflow created yet</p>
          <p className="text-sm text-muted-foreground "> Click the button to create your first workflow </p>
        </div>
        <CreateWorkFlowDialogue triggerText="Create Your First Workflow" />
      </div>
    )
  }

  return <div className="grid grid-cols-1 gap-4">
    {workflows.map((workflow : {workflow : Workflow}) => (
      <WorkFlowCard key={workflow.id} workflow={workflow} />
    ))}
  </div>
}

export default page
