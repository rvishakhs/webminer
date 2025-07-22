import { SquareDashedMousePointer } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { cn } from '~/lib/utils';
import { GiSpiderWeb } from "react-icons/gi";
import { MdScreenSearchDesktop } from "react-icons/md";


function Logo({
    fontSize = "text-2xl",
    iconSize = 20,
} : {
    fontSize?: string;
    iconSize?: number;
}) {
  return (
    <div>
        <Link href="/" className={cn("text-2xl font-extrabold flex items-center gap-2", fontSize)}>
            <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
                <MdScreenSearchDesktop size={iconSize} className='stroke-white' />
                {/* <GiSpiderWeb size={iconSize} className='stroke-white' /> */}
            </div>
            <div>
                <span className="bg-gradient-to-r font from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                    Web
                </span>
                <span className="text-stone-700 dark:text-stone-300">Miner</span>
            </div>
        </Link>
    </div>
  )
}

export default Logo
