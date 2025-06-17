"use client"

import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList} from './ui/breadcrumb'
import { usePathname } from 'next/navigation'
import { Mobilesidebar } from './Sidebar';

function BreadcrumbHeader() {
    const pathname = usePathname();
    const paths = pathname === '/' ? [""] : pathname.split('/');
  return (
    <div className='flex items-center flex-start'>
      <Mobilesidebar />
      <Breadcrumb>
        <BreadcrumbList>
            {paths.map((path, index) => (
                <React.Fragment key={index}>
                    <BreadcrumbItem>
                        <BreadcrumbLink className='capitalize' href={`/${path}`}>
                            {path === "" ? "Home" : path}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </React.Fragment>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default BreadcrumbHeader
