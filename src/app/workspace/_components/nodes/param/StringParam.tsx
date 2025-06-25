'use client'

import React, { useEffect, useId } from 'react'
import type { ParamProps } from 'types/appNode';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea';


function StringParam({ param , value, updateNodeParamValue, disabled}: ParamProps) {
    const [internalValue, setInternalValue] = React.useState(value);
    const id = useId();

    useEffect(() => {
        setInternalValue(value)
    }, [value])

    let Component: any = Input; 

    if(param.Variant === 'textarea') {
        Component = Textarea;
    }

  return (
    <div className='space-y-1 p-1 w-full'>
        <Label htmlFor={id} className='text-xs flex'>
            {param.name}
            {param.required && (
                <p className='text-red-400'>*</p>
            )}
        </Label>
        <Component 
            id={id} 
            disabled={disabled}
            className='bg-white text-xs'
            value={internalValue} 
            placeholder='Enter value here'

            onChange={(e: any) => setInternalValue(e.target.value)}
            onBlur={(e: any) => updateNodeParamValue(e.target.value)}
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