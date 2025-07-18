"use client"

import { SelectContent } from '@radix-ui/react-select'
import React from 'react'

import type { Periods } from 'types/analythics'
import { Select, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

const periodMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]


function PeriodSelector({periods} : {periods : Periods[]}) {



  return (
    <Select>
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
