'use client'


import type { GetWorkflowExecutionStatus } from 'actions/workflows/analytics/getworkflowexecutionstatus'
import {  Layers2 } from 'lucide-react'
import React from 'react'
import { Area, AreaChart, CartesianAxis, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart'
import WorkFlowCard from '../../workspace/_components/WorkFlowCard'
import type { Workflow } from '@prisma/client'
import { Button } from '~/components/ui/button'
import Link from 'next/link'

type Chartdata = Awaited<ReturnType<typeof GetWorkflowExecutionStatus>>

const chartConfig = {
    success : {
        label : "Success",
        color : "hsl(var(--chart-2))",
    },
    failed : {
        label : "Failed",
        color : "hsl(var(--chart-1))",
    }
}

const successColor = getComputedStyle(document.documentElement).getPropertyValue('--color-success').trim();
const failedColor = getComputedStyle(document.documentElement).getPropertyValue('--color-failed').trim();

function Executionchart({workflows}: {workflows: Workflow[]}) {


  return (
    <Card>
        <CardHeader >
            <CardTitle className='text-2xl font-bold flex items-center gap-2'>
            <Layers2 className='h-6 w-6 text-primary'/>    
                Recent Workflow Executions
            </CardTitle>
            <CardDescription>
            <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                    Here you can see the recent workflow executions and their status.
                </p>

                <Button variant="link">
                    <Link href="/workspace">View All</Link>
                </Button>
            </div>
                
            </CardDescription>
        </CardHeader>
        <CardContent>
             <div className="grid grid-cols-1 gap-4">
                {workflows.map((workflow : {workflow : Workflow}) => (
                <WorkFlowCard key={workflow.id} workflow={workflow} />
            ))}
        </div>
        </CardContent>
    </Card>
  )
}

export default Executionchart
