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


function PeriodSelector({periods} : {periods : Periods[]}) {
    // const searchParams = useSearchParams();
    // const router = useRouter();

  return (
    <Select 
        // onValueChange={(value) => {
        // const [month, year] = value.split('-');
        // const params = new URLSearchParams(searchParams)
        // params.set('month', month!)
        // params.set('year', year!)
        // router.push(`?${params.toString()}`)
        // }}
    >
        <SelectTrigger className='w-[200px]'>
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            {periods.map((period, index) => (
                <SelectItem key={index} value={`${period.month}-${period.year}`}>
                    {`${periodMonths[period.month - 1]} ${period.year}`}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default PeriodSelector
