"use client"

import { SelectContent } from '@radix-ui/react-select'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

import type { Periods } from 'types/analythics'
import { Select, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

const periodMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]


function PeriodSelector({periods, selectedPeriod} : {periods : Periods[], selectedPeriod: Periods}) {
    const searchParams = useSearchParams();
    const router = useRouter();

  return (
    <div className='relative'>
        <Select 
            value={`${selectedPeriod.month}-${selectedPeriod.year}`}
            onValueChange={(value) => {
            const [month, year] = value.split('-');
            const params = new URLSearchParams(searchParams)
            params.set('month', month!)
            params.set('year', year!)
            router.push(`?${params.toString()}`)
            }}
            
        >
            <SelectTrigger className='w-[200px]'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent className='z-[100] w-[200px] bg-white shadow-lg border border-gray-300 rounded-md text-sm'>
                {periods.map((period, index) => (
                    <SelectItem className='' key={index} value={`${period.month}-${period.year}`}>
                        {`${periodMonths[period.month - 1]} ${period.year}`}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  )
}

export default PeriodSelector
