'use client'

import { useId, useState } from 'react'

import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import type { ColumnDef, PaginationState } from '@tanstack/react-table'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UserAvatar from '@/components/UserAvatar'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export type AllUserSchema = {
    id: string
    name: string
    nim: string
    image: string | null
    postCount: number
}

export const columns: ColumnDef<AllUserSchema>[] = [
    {
        header: 'User',
        accessorKey: 'name',
        cell: ({ row }) => (
            <div className='flex items-center gap-3'>
                <UserAvatar avatarUrl={row.original.image} size={40} className="max-h-10 max-w-10 rounded" />
                <div className='font-medium'>{row.getValue('name')}</div>
            </div>
        )
    },
    {
        header: 'NIM',
        accessorKey: 'nim',
        cell: ({ row }) => <div>{row.getValue('nim')}</div>,
        enableSorting: false,
    },
    {
        header: 'Jumlah Post',
        accessorKey: 'postCount',
        cell: ({ row }) => <div>{row.getValue('postCount')}</div>,
        enableSorting: false,
    }
]

export function DataTable<TData, TValue>({
    columns,
    data
}: DataTableProps<TData, TValue>) {
    const id = useId()

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    })

    const [globalFilter, setGlobalFilter] = useState('')

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: 'includesString',
        state: {
            pagination,
            globalFilter
        }
    })

    return (
        <div className='w-full'>
            <div className='bg-card rounded-md border'>
                <div className='flex flex-wrap gap-3 px-2 py-6'>
                    <div className='w-44'>
                        <Input
                            placeholder='Search user name/NIM'
                            value={globalFilter ?? ''}
                            onChange={e => setGlobalFilter(String(e.target.value))}
                            className='max-w-md'
                        />
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id} className='bg-muted/50'>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead key={header.id} className='relative h-10 border-t select-none'>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender
                                                    (header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center justify-between gap-8 mt-4'>
                <div className='flex items-center gap-3'>
                    <Label htmlFor={id} className='max-sm:sr-only'>
                        Rows per page
                    </Label>
                    <Select
                        value={table.getState().pagination.pageSize.toString()}
                        onValueChange={value => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger id={id} className='w-fit whitespace-nowrap bg-card'>
                            <SelectValue placeholder='Select number of results' />
                        </SelectTrigger>
                        <SelectContent className='[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2'>
                            {[10, 20, 50, 100].map(pageSize => (
                                <SelectItem key={pageSize} value={pageSize.toString()}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='text-muted-foreground flex grow justify-end text-sm whitespace-nowrap'>
                    <p className='text-muted-foreground text-sm whitespace-nowrap' aria-live='polite'>
                        <span className='text-foreground'>
                            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                            {Math.min(
                                Math.max(
                                    table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                                    table.getState().pagination.pageSize,
                                    0
                                ),
                                table.getRowCount()
                            )}
                        </span>{' '}
                        of <span className='text-foreground'>{table.getRowCount().toString()}</span>
                    </p>
                </div>

                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button
                                    size='icon'
                                    variant='outline'
                                    className='disabled:pointer-events-none disabled:opacity-50'
                                    onClick={() => table.firstPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label='Go to first page'
                                >
                                    <ChevronFirstIcon size={16} aria-hidden='true' />
                                </Button>
                            </PaginationItem>

                            <PaginationItem>
                                <Button
                                    size='icon'
                                    variant='outline'
                                    className='disabled:pointer-events-none disabled:opacity-50'
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label='Go to previous page'
                                >
                                    <ChevronLeftIcon size={16} aria-hidden='true' />
                                </Button>
                            </PaginationItem>

                            <PaginationItem>
                                <Button
                                    size='icon'
                                    variant='outline'
                                    className='disabled:pointer-events-none disabled:opacity-50'
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    aria-label='Go to next page'
                                >
                                    <ChevronRightIcon size={16} aria-hidden='true' />
                                </Button>
                            </PaginationItem>

                            <PaginationItem>
                                <Button
                                    size='icon'
                                    variant='outline'
                                    className='disabled:pointer-events-none disabled:opacity-50'
                                    onClick={() => table.lastPage()}
                                    disabled={!table.getCanNextPage()}
                                    aria-label='Go to last page'
                                >
                                    <ChevronLastIcon size={16} aria-hidden='true' />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}
