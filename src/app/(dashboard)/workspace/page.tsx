import { getWorkflowForUser } from 'actions/workflows/getWorkflowForUser'
import { AlertCircle } from 'lucide-react'
import React, { Suspense } from 'react'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Skeleton } from '~/components/ui/skeleton'
import { waitFor } from '~/lib/helper/waitFor'

function page() {
  return (
    <div className='flex flex-col h-screen flex-1 '>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className='text-3xl font-bold'>
            Workspace
          </h1>
          <p className="text-muted-foreground"> Manage your workflows</p>
        </div>
        <div className="h-full py-6">
          <Suspense fallback={<UserWorkFLowSkeleton />}>
            <UserWorkFlow />
          </Suspense>
        </div>
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
  await waitFor(3000);
  return <div></div>
}

export default page
