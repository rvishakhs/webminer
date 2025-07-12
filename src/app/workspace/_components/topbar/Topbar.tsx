'use client'

import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import React from 'react'
import TooltipWrapper from '~/components/TooltipWrapper'
import { Button } from '~/components/ui/button'
import SaveBtn from './SaveBtn'
import ExecuteBtn from './ExecuteBtn'
import NavigationTabs from './NavigationTabs'
import PublishBtn from './PublishBtn'
import UnPublishBtn from './UnPublishBtn'


interface Props {
    tittle: string;
    subtittle?: string;
    workflowId: string;
    hideBtn?: boolean;
    isPublished?: boolean;
}

function topbar({tittle, subtittle, workflowId, hideBtn=false, isPublished} : Props) {

    const router = useRouter()

  return (
    <header className="flex p-2 border border-separate justify-between 
    w-full h-[60px] sticky top-0 bg-background z-10">
        <div className="flex gap-1 flex-1">
            <TooltipWrapper content={"Back"}>
                <Button 
                    variant={"ghost"} 
                    size={"icon"}
                    onClick={() => router.back()}
                >
                    <ChevronLeftIcon size={20} />
            
                </Button>

            </TooltipWrapper>
            <div className="items-center gap-1">
                <p className="font font-bold text-ellipsis truncate">{tittle}</p>
                {subtittle && (
                    <p className="text-xs text-muted-foreground text-ellipsis">
                        {subtittle}
                    </p>
                )}
            </div>
        </div>
        <NavigationTabs workflowid={workflowId} />
        {/* Here we going to render the save button */}
        <div className="flex gap-1 flex-1 justify-end">
            {hideBtn === false && (
                <>
                    <ExecuteBtn workflowId={workflowId} />
                    {isPublished && <UnPublishBtn workflowId={workflowId} />}
                    {!isPublished && (
                        <>
                        <SaveBtn workflowId={workflowId}/> 
                        <PublishBtn workflowId={workflowId} />
                        </>
                    )}
                </>
            )}
        </div>
    </header>
  )
}

export default topbar