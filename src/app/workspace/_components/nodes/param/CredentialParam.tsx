"use client"

import { SelectGroup, SelectLabel } from '@radix-ui/react-select'
import { useQuery } from '@tanstack/react-query'
import { GetCredentialsForUser } from 'actions/workflows/credentials/getusercredentials'
import React, { useId } from 'react'
import type { ParamProps } from 'types/appNode'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '~/components/ui/select'

type optionType = {
  label: string;
  value: string;
}

function CredentialParam ({param, updateNodeParamValue, value} : ParamProps) {

  const id =  useId()
  const query = useQuery({
    queryKey: ['credentials-for-user'],
    queryFn: () => GetCredentialsForUser(),
    refetchInterval: 10000, 
  })

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
            <SelectLabel className='text-xs font-medium py-2 px-2 text-muted-foreground'>Credentials</SelectLabel>
            {query.data?.map((credential) => (
              <SelectItem key={credential.id} value={credential.id}>
                {credential.name}
              </SelectItem>
            ))}

          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default CredentialParam 