'use client'

import React, { useId } from 'react'
import type { ParamProps } from 'types/appNode';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label'


function StringParam({ param , value, updateNodeParamValue}: ParamProps) {
    const id = useId();

  return (
    <div className='space-y-1 p-1 w-full'>
        <Label htmlFor={id} className='text-xs flex'>
            {param.name}
            {param.required && (
                <p className='text-red-400'>*</p>
            )}
        </Label>
        <Input 
            id={id} 
            className='bg-white'
            value={value} 
            placeholder='Enter value here'
            onChange={(e) => updateNodeParamValue(e.target.value)}
        /> 
        {param.helperText && (
            <p className="text-muted-foreground px-2">
                {param.helperText}
            </p>
        )}
    </div>
  )
}

export default StringParam