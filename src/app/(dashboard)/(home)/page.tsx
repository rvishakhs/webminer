import { GetPeriods } from 'actions/workflows/analytics/getperiods';
import React, { Suspense } from 'react'
import PeriodSelector from './_components/PeriodSelector';
import type { Periods } from 'types/analythics';
import { Skeleton } from '~/components/ui/skeleton';
import { GetStatusCardsValues } from 'actions/workflows/analytics/getstatusforperiod';

function HomePage({searchParams}: {searchParams : {month?: string; year?: string} }) {


  const currentDate = new Date();
  const {month, year} = searchParams;
  const periods: Periods = {
    month : month ? parseInt(month) : currentDate.getMonth() + 1,
    year: year ? parseInt(year) : currentDate.getFullYear(), 
  }

  return (
    <div className='flex  flex-1 flex-col h-full'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Home</h1>
        <Suspense fallback={
          <Skeleton className='w-[150px] h-[40px]'/>
        }>
          <PeriodSelectorWrapper selectedPeriod={periods} />
        </Suspense>
      </div>
      <StatsCards selectedPeriod={periods}/>
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
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>

  )
}



export default HomePage




