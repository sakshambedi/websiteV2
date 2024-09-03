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
        <section className='flex w-9/12 flex-col pt-7 items-center justify-center phone:pt-2 font-mono'>
            <Table>
                {/* <TableCaption>Developing skills and sharing knowledge.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-sm text-left dark:text-gray-400 text-gray-600 pl-0'>date</TableHead>
                        <TableHead className='text-sm text-left dark:text-gray-400 text-gray-600'>title</TableHead>
                        <TableHead className='text-sm text-right dark:text-gray-400 text-gray-600 pr-0'>category</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allData.map(({ slug, date, title, category }: BlogPostTableInterface) => (
                        <TableRow key={slug} className='hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer '>
                            <TableCell className='text-base text-left dark:text-gray-100 text-black w-24 pl-0' > {new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</TableCell>
                            <TableCell className='text-base text-left dark:text-gray-100 text-black'>
                                <Link href={`/${slug}/`}>
                                    {title}
                                </Link>
                            </TableCell>
                            <TableCell className="text-base text-right dark:text-gray-100 text-black  pr-0">{category}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section >
    );
}