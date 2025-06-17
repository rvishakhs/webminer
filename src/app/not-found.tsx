import Link from 'next/link';
import React from 'react'
import { VscBracketError } from "react-icons/vsc";
import { MdArrowBack } from "react-icons/md";
function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
        <div className='text-center' >
            <div className='flex items-center justify-center mb-4'>
                <VscBracketError  className='w-20 h-20 justify-center' />
            </div>
            <h1 className="text-6xl font-medium text-primary mb-4">404</h1>

            <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
            <p className='text-muted-foreground mb-8 max-w-md'>
                Well, this is awkward... there's nothing here!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gp-4">
                <Link href={"/"} className='flex items-center justify-center px-4 py-2 bg-primary 
                text-white rounded-md hover:bg-primary/70 transition-colors'>
                    <MdArrowBack className='w-4 h-4 mr-2' /> Back to Home
                </Link>
            </div>
        </div>
      
    </div>
  )
}

export default NotFoundPage
