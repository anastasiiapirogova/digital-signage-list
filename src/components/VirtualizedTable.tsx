import { useRef, useState, type RefObject } from 'react'
import { TbCaretUpFilled, TbCaretDownFilled } from 'react-icons/tb'
import {
	useReactTable,
	getCoreRowModel,
	type ColumnDef,
	flexRender,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	type Row,
	type Table,
} from '@tanstack/react-table'
import {
	useWindowVirtualizer,
	type VirtualItem,
	type Virtualizer,
} from '@tanstack/react-virtual'

type TableBodyProps<TData> = {
	table: Table<TData>
	tableContainerRef: RefObject<HTMLDivElement | null>
}

type TableBodyRowProps<TData> = {
	row: Row<TData>
	virtualRow: VirtualItem
	rowVirtualizer: Virtualizer<Window, Element>
}

type VirtualizedTableProps<TData> = {
	data: TData[]
	columns: ColumnDef<TData>[]
	initialSorting?: SortingState
	className?: string
}

const TableHeader = <TData,>({ table }: { table: Table<TData> }) => (
	<thead
		className='bg-white sticky top-0 z-10 grid'
	>
		{table.getHeaderGroups().map(headerGroup => (
			<tr
				key={headerGroup.id}
				className="flex w-full border-b border-gray-200"
			>
				{headerGroup.headers.map(header => {
					return (
						<th
							key={header.id}
							style={{
								width: header.getSize(),
							}}
							className="text-left py-3 px-6 font-semibold text-gray-700"
						>
							<div
								className={
									header.column.getCanSort()
										? 'cursor-pointer select-none flex items-center gap-1'
										: 'flex items-center'
								}
								onClick={header.column.getToggleSortingHandler()}
								title={
									header.column.getCanSort()
										? header.column.getNextSortingOrder() === 'asc'
											? 'Sort ascending'
											: header.column.getNextSortingOrder() === 'desc'
												? 'Sort descending'
												: 'Clear sort'
										: undefined
								}
							>
								{flexRender(
									header.column.columnDef.header,
									header.getContext()
								)}
								{header.column.getIsSorted() === 'asc' ? (
									<TbCaretUpFilled className="w-4 h-4" />
								) : header.column.getIsSorted() === 'desc' ? (
									<TbCaretDownFilled className="w-4 h-4" />
								) : null}
							</div>
						</th>
					)
				})}
			</tr>
		))}
	</thead>
)

const TableBodyRow = <TData,>({ row, virtualRow, rowVirtualizer }: TableBodyRowProps<TData>) => (
	<tr
		data-index={virtualRow.index}
		ref={node => rowVirtualizer.measureElement(node)}
		key={row.id}
		style={{
			display: 'flex',
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: `${virtualRow.size}px`,
			transform: `translateY(${
				virtualRow.start - rowVirtualizer.options.scrollMargin
			}px)`,
		}}
		className="border-b border-gray-100 hover:bg-gray-50 transition-colors items-center"
	>
		{row.getVisibleCells().map(cell => {
			return (
				<td
					key={cell.id}
					style={{
						display: 'flex',
						width: cell.column.getSize(),
					}}
					className="py-4 px-6"
				>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</td>
			)
		})}
	</tr>
)

const TableBody = <TData,>({ table, tableContainerRef }: TableBodyProps<TData>) => {
	const { rows } = table.getRowModel()

	const rowVirtualizer = useWindowVirtualizer({
		count: rows.length,
		estimateSize: () => 96,
		overscan: 5,
		scrollMargin: tableContainerRef.current?.offsetTop ?? 0,
	})

	return (
		<tbody
			style={{
				display: 'grid',
				height: `${rowVirtualizer.getTotalSize()}px`,
				width: '100%',
				position: 'relative',
			}}
		>
			{rowVirtualizer.getVirtualItems().map(virtualRow => {
				const row = rows[virtualRow.index] as Row<TData>
				return (
					<TableBodyRow
						key={row.id}
						row={row}
						virtualRow={virtualRow}
						rowVirtualizer={rowVirtualizer}
					/>
				)
			})}
		</tbody>
	)
}

export const VirtualizedTable = <TData,>({ 
	data, 
	columns, 
	initialSorting = [],
	className = ''
}: VirtualizedTableProps<TData>) => {
	const [sorting, setSorting] = useState<SortingState>(initialSorting)
	const tableContainerRef = useRef<HTMLDivElement>(null)

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		autoResetPageIndex: false,
		state: {
			sorting,
		},
	})

	return (
		<div ref={tableContainerRef} className={className}>
			<table className='min-w-full relative grid border border-gray-200 xl:rounded-lg'>
				<TableHeader table={table} />
				<TableBody table={table} tableContainerRef={tableContainerRef} />
			</table>
		</div>
	)
} 