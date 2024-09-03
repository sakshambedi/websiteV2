import React from 'react'
import { cn } from '@/lib/utils'


interface MaxWidthProps {
    className: string
    children: React.ReactNode
}

const MaxWidthWrapper = ({ className, children }: MaxWidthProps) => {
    return (
        <div className={cn(' max-w-screen max-h-full w-full my-12 flex flex-col ', className)}>{children}</div>
    )
}

export default MaxWidthWrapper
