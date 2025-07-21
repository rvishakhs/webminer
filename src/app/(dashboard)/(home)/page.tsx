import { GetPeriods } from 'actions/workflows/analytics/getperiods';
import React, { Suspense } from 'react'
import PeriodSelector from './_components/PeriodSelector';
import type { Periods } from 'types/analythics';

function HomePage({searchParams}: {searchParams : {month?: string; year?: string} }) {


  const currentDate = new Date();
  const {month, year} = searchParams;
  const periods: Periods = {
    month : month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(), 
  }

  return (
    <div>
      <Suspense>
        <PeriodSelectorWrapper />
      </Suspense>
    </div>
  )
}

async function PeriodSelectorWrapper(){
  const periods = await GetPeriods();

  return (
    <PeriodSelector periods={periods}/>
  )
}

export default HomePage
