'use client'


import type { GetWorkflowExecutionStatus } from 'actions/workflows/analytics/getworkflowexecutionstatus'
import {  Layers2 } from 'lucide-react'
import React from 'react'
import { Area, AreaChart, CartesianAxis, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { ChartContainer, ChartLegend, ChartTooltip } from '~/components/ui/chart'

type Chartdata = Awaited<ReturnType<typeof GetWorkflowExecutionStatus>>

const chartConfig = {
    success : {
        label : "Success",
        color : "hsl(var(--primary))",
    },
    failed : {
        label : "Failed",
        color : "hsl(var(--destructive))",
    }
}

function Executionchart({data}: {data: Chartdata}) {
  return (
    <Card>
        <CardHeader>
            <CardTitle className='text-2xl font-bold flex items-center gap-2'>
            <Layers2 className='h-6 w-6 text-primary'/>    
                Workflow Execution Status
            </CardTitle>
            <CardDescription>
                Daily execution status of your workflows
            </CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className='h-[300px] w-full'>
                <AreaChart data={data}>
                    <CartesianGrid />
                    <XAxis dataKey={"date"} />
                    <ChartLegend />
                    <ChartTooltip />
                    <Area dataKey={"success"} />
                    <Area dataKey={"failed"} />

                </AreaChart>
            </ChartContainer>
        </CardContent>
    </Card>
  )
}

export default Executionchart
