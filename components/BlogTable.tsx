import React from 'react'
import Link from 'next/link';
import { AllPostDataTableInterface, BlogPostTableInterface } from '@/interface/PostData';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export default function BlogTable({ allData }: { allData: AllPostDataTableInterface }) {

    if (!allData || allData.length === 0) {
        return <p>No articles found.</p>;
    }

    return (
        <section className='flex w-full flex-col items-center justify-center font-mono'>
            <Table>
                {/* <TableCaption>Developing skills and sharing knowledge.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-sm text-left dark:text-gray-400 text-gray-600 pl-0 phone:px-0 phone:text-xs'>date</TableHead>
                        <TableHead className='text-sm text-left dark:text-gray-400 text-gray-600 phone:text-xs phone:px-1'>title</TableHead>
                        <TableHead className='text-sm text-right dark:text-gray-400 text-gray-600 pr-0 phone:text-xs phone:px-0' >category</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allData.map(({ slug, date, title, category }: BlogPostTableInterface) => (
                        <TableRow key={slug} className='cursor-pointer '>
                            <TableCell className='text-base text-left dark:text-gray-100 text-black w-24 pl-0 phone:text-sm phone:px-0 phone:w-9 md:w-13 md:p-0'>
                                {`${new Date(date).toLocaleDateString(undefined, { month: 'short' }).toLowerCase()} '${new Date(date).getFullYear().toString().slice(-2)}`}
                            </TableCell>
                            <TableCell className='text-base text-left dark:text-gray-100 text-black phone:text-sm phone:px-1 phone:py-1 md:px-2 md:py-1.5 '>
                                <Link href={`/${slug}/`}>
                                    {title}
                                </Link>
                            </TableCell>
                            <TableCell className="text-base text-right dark:text-gray-100 text-black pr-0 phone:text-sm phone:px-0 phone:py-1 phone:w-4">{category}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section >
    );
}