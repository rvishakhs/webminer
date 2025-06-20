import { Loader2 } from 'lucide-react'
import React from 'react'

function Loading() {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-full'>
        <Loader2 size={30}
        className="animate-spin text-primary" />
    </div>
  )
}

export default Loading