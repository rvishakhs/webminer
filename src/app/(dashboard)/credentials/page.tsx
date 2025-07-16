import { GetCredentialsForUser } from 'actions/workflows/credentials/getusercredentials'
import { Loader2Icon, LockKeyhole, ShieldCheck, ShieldOffIcon } from 'lucide-react'
import React, { Suspense } from 'react'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Card } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import CreateCredentialDialogue from './_components/CreateCredentialDialogue'
import { formatDistanceToNow } from 'date-fns'
import DeleteCredentialswDialogue from './_components/DeleteCredentialDialogue'

function Credentialspage() {

  return (
    <div className='flex flex-col flex-1 h-full gap-2'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold'>
            Credentials
          </h1>
          <p className='text-muted-foreground '>Manage Your Credentials</p>
        </div>
      </div>

      <div className="h-full  space-y-8 ">
        <Alert className=''>
          <ShieldCheck className='h-6 w-6 stroke-primary' />
          <AlertTitle className='text-primary'>Encryption: </AlertTitle>
          <AlertDescription>
              All information is encrypted and stored securely.
          </AlertDescription>
        </Alert>

        <Suspense fallback={
          <Skeleton className='h-[300px] w-full' />
        }>
          <UserCredentials />
        </Suspense>
      </div>
    </div>
  )
}

export default Credentialspage


async function UserCredentials() {

  const Credentials = await GetCredentialsForUser();

  if(!Credentials) {
    return <div>Something Went Wrong</div>
  }

  if(Credentials.length === 0) {
    return (
      <Card className='w-full p-4'>
        <div className='flex flex-col items-center justify-center h-full gap-4 '>
          <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
            <ShieldOffIcon size={40} className='stroke-primary'/>
          </div>
          <div className='flex flex-col items-center gap-1 px-2 text-center'>
            <p className="font-bold">No credentials created yet.</p>
            <p className='text-sm text-muted-foreground'>Click the button to create your credentials</p>
            <CreateCredentialDialogue />
          </div>
        </div>
      </Card>
    )
  }
  
  return (
    <div className="flex gap-2 flex-wrap">
      {Credentials.map((credential) => {
        const createdAt = formatDistanceToNow(credential.createdAt, { addSuffix: true });
        return (
          <Card key={credential.id} className='w-full p-4 flex justify-between'>
            <div className='flex items-center gap-4'>
              <div className='rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center'>
                <LockKeyhole size={18} className='stroke-primary' />
              </div>
              <div className="">
                <p className="font-bold">{credential.name}</p>
                <p className="text-xs text-muted-foreground">{createdAt}</p>
              </div>
            </div>
            <DeleteCredentialswDialogue name={credential.name}/>
          </Card>
        )
      })}
    </div>
  )
}

