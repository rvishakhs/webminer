"use client"

import { SelectGroup, SelectLabel } from '@radix-ui/react-select'
import React, { useId } from 'react'
import type { ParamProps } from 'types/appNode'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '~/components/ui/select'

type optionType = {
  label: string;
  value: string;
}

function SelectParam ({param, updateNodeParamValue, value} : ParamProps) {

  const id =  useId()
  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={id} className="flex text-xs">
        {param.name}
        {param.required && <p className='text-destructive'>*</p>}
      </Label>
      <Select 
        onValueChange={(value) => updateNodeParamValue(value)}
        defaultValue={value}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className='text-xs font-medium py-2 px-2 text-muted-foreground'>Options</SelectLabel>
            {/* <SelectSeparator /> */}
            {param.options?.map((option : optionType) => (
              <SelectItem className='w-full' key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectParam 