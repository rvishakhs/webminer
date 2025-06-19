import React from 'react'
import Logo from '~/components/Logo'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col h-screen items-center justify-center gap-2 bg-white'>
      <Logo />  
      {children}
    </div>
  )
}

export default layout
