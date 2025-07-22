
import { GetPeriods } from 'actions/workflows/analytics/getperiods';
import React, { Suspense } from 'react'
import PeriodSelector from './_components/PeriodSelector';
import type { Periods } from 'types/analythics';
import { Skeleton } from '~/components/ui/skeleton';
import { GetStatusCardsValues } from 'actions/workflows/analytics/getstatusforperiod';
import { CirclePlayIcon } from 'lucide-react';
import StatusCard from './_components/StatusCard';
import { waitFor } from '~/lib/helper/waitFor';
import { GetWorkflowExecutionStatus } from 'actions/workflows/analytics/getworkflowexecutionstatus';
import Executionchart from './_components/Executionchart';
import HomeBanner from './_components/HomeBanner';
import { getLastTwoWorkflows } from 'actions/workflows/analytics/getlasttwoworkflows';

function HomePage({searchParams}: {searchParams : {month?: string; year?: string} }) {


  const currentDate = new Date();
  const {month, year} = searchParams;
  const periods: Periods = {
    month : month ? parseInt(month) : currentDate.getMonth() + 1,
    year: year ? parseInt(year) : currentDate.getFullYear(), 
  }

  return (
    <div className='flex  flex-1 flex-col h-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Home</h1>
        <Suspense fallback={
          <Skeleton className='w-[150px] h-[40px]'/>
        }>
          <PeriodSelectorWrapper  selectedPeriod={periods} />
        </Suspense>
      </div>
      <div className="h-full py-6 flex flex-col gap-4">
        <Suspense fallback={<Skeleton className='h-[120px]' />}>
          <StatsCards selectedPeriod={periods} />
        </Suspense>
        <Suspense fallback={<Skeleton className='w-full h-[300px]' />}>
          <StatusExecutionStatus selectedPeriod={periods} />
        </Suspense>
        <Suspense fallback={<Skeleton className='w-full h-[300px]' />}>
          <RecentWorkflowExecutions   />
        </Suspense>

      </div>
    </div>
  )
}

async function PeriodSelectorWrapper({
  selectedPeriod
}: {
  selectedPeriod: Periods
}){
  const periods = await GetPeriods();

  return (
    <PeriodSelector periods={periods} selectedPeriod={selectedPeriod}/>
  )
}


async function StatsCards({
  selectedPeriod
}: {
  selectedPeriod: Periods
}){

  const data = await GetStatusCardsValues(selectedPeriod);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 mt-4 min-h-[120px]'>
      <StatusCard title="Workflow Executions" value={data.workflowExecutions} icon="CirclePlayIcon"/>
      <StatusCard title="Workflow Completed" value={data.workflowCompleted} icon="AwardIcon"/>
      <StatusCard title="Workflow Failed" value={data.workflowFailed} icon="CircleXIcon"/>
    </div>

  )
}

async function StatusExecutionStatus({
  selectedPeriod
}: {
  selectedPeriod: Periods
}) {

  const data = await GetWorkflowExecutionStatus(selectedPeriod);

  return (
    <Executionchart data={data} />
  )

}


async function RecentWorkflowExecutions() {

  const lastworkflows = await getLastTwoWorkflows();

  return (
    <HomeBanner workflows={lastworkflows} />
  )

}



export default HomePage




