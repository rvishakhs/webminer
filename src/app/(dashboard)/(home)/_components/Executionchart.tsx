'use client'


import type { GetWorkflowExecutionStatus } from 'actions/workflows/analytics/getworkflowexecutionstatus'
import {  Layers2 } from 'lucide-react'
import React from 'react'
import { Area, AreaChart, CartesianAxis, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart'

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
                <AreaChart 
                    data={data} 
                    height={200} 
                    accessibilityLayer 
                    margin={{ top: 20}}
                >
                    <CartesianGrid />
                    <XAxis 
                        dataKey={"date"}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                        tickFormatter={(Value) => {
                            const date = new Date(Value)
                            return date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric"
                            })
                        } }  
                    />
                    <ChartLegend 
                        content={<ChartLegendContent />} 
                    />
                    <ChartTooltip 
                        content={<ChartTooltipContent className='w-[200px]' />}
                    />
                    <Area 
                        dataKey={"success"} 
                        min={0}
                        type={"bump"}
                        fillOpacity={0.6}
                        fill="hsl(140, 74%, 44%)"
                        stroke="hsl(140, 74%, 44%)"
                        stackId={"a"}
                    />
                    <Area 
                        dataKey={"failed"} 
                        min={0}
                        type={"bump"}
                        fillOpacity={0.6}
                        fill="hsl(142, 88%, 28%)"
                        stroke="hsl(142, 88%, 28%)"
                        stackId={"a"}
                    />
                </AreaChart>
            </ChartContainer>
        </CardContent>
    </Card>
  )
}

export default Executionchart
