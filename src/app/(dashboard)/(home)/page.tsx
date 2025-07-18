import { GetPeriods } from 'actions/workflows/analytics/getperiods';
import React, { Suspense } from 'react'
import PeriodSelector from './_components/PeriodSelector';

function HomePage() {
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
    <PeriodSelector periods={periods} />
  )
}

export default HomePage
