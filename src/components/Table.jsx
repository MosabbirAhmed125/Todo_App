import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	flexRender,
} from "@tanstack/react-table";

export default function PracticeTable({ table }) {
	return (
		<div className="p-6 scale-125 flex flex-col items-center">
			<br />
			<div className="flex gap-4">
				<input
					type="text"
					placeholder="Search by username..."
					value={table.getColumn("username")?.getFilterValue() ?? ""}
					onChange={(e) =>
						table
							.getColumn("username")
							?.setFilterValue(e.target.value)
					}
					className="px-4 py-2 border-2 border-gray-100 text-gray-100
				focus:border-blue-500 focus:outline-none rounded w-69"
				/>
				<select
					value={table.getColumn("status")?.getFilterValue() ?? ""}
					onChange={(e) =>
						table
							.getColumn("status")
							?.setFilterValue(e.target.value || undefined)
					}
					className="px-4 py-2 border-2 border-gray-100 rounded 
					focus:border-blue-500 focus:outline-none text-gray-100"
				>
					<option value="" className="text-gray-900">
						All Status
					</option>
					<option value="Done" className="text-gray-900">
						Done
					</option>
					<option value="Pending" className="text-gray-900">
						Pending
					</option>
				</select>
			</div>
			<br />
			<div className="overflow-y-auto h-78 px-3 scrollbar-custom bg-transparent">
				<table className="min-w-full border-separate border-spacing-0.5 border border-gray-100 bg-transparent">
					<thead className="sticky top-0 z-20 bg-red-400 text-gray-900">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="border px-4 py-2 text-left border-gray-100"
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className="hover:bg-blue-300 hover:text-gray-900 bg-transparent text-gray-50"
							>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="border px-4 py-2 border-gray-100"
									>
										{flexRender(
											cell.column.columnDef.cell ??
												cell.column.columnDef
													.accessorKey,
											cell.getContext(),
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
