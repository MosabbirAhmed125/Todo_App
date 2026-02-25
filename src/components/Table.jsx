import { Fragment } from "react";
import { flexRender } from "@tanstack/react-table";
import { motion, AnimatePresence } from "motion/react";
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export default function PracticeTable({ table }) {
	const statuses = ["", "Done", "Pending"];
	const statusValue = table.getColumn("status")?.getFilterValue() ?? "";
	return (
		<div className="p-6 scale-125 flex flex-col items-center">
			<br />
			<div className="flex gap-4">
				<motion.input
					type="text"
					placeholder="Search by username..."
					value={table.getColumn("username")?.getFilterValue() ?? ""}
					onChange={(e) =>
						table
							.getColumn("username")
							?.setFilterValue(e.target.value)
					}
					className="px-4 py-2 border-2 border-gray-100 text-gray-100 rounded w-69 focus:outline-none"
					whileFocus={{
						scale: 1.02,
						boxShadow: "0 4px 12px rgba(59,130,246,0.2)",
						borderColor: "#3b82f6",
					}}
					transition={{ type: "spring", stiffness: 300, damping: 20 }}
				/>
				<div className="relative w-32">
					<Listbox
						value={statusValue}
						onChange={(val) =>
							table
								.getColumn("status")
								?.setFilterValue(val || undefined)
						}
					>
						{({ open }) => (
							<div className="relative">
								<ListboxButton as={Fragment}>
									<motion.button
										className={`
										w-full px-4 py-2 border-2 rounded
										text-gray-100 text-left
										flex items-center justify-between
										focus:outline-none
										${open || statusValue ? "border-blue-500" : "border-gray-100"}
										`}
										whileFocus={{
											scale: 1.02,
											boxShadow:
												"0 4px 12px rgba(59,130,246,0.2)",
										}}
										transition={{
											type: "spring",
											stiffness: 300,
											damping: 20,
										}}
									>
										<span>
											{statusValue || "All Status"}
										</span>

										<motion.div
											animate={{ rotate: open ? 180 : 0 }}
											transition={{ duration: 0.2 }}
											className="flex items-center"
										>
											<ChevronDown className="w-4 h-4 text-current" />
										</motion.div>
									</motion.button>
								</ListboxButton>

								<AnimatePresence>
									{open && (
										<ListboxOptions
											as={motion.ul}
											initial={{ opacity: 0, y: -5 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -5 }}
											transition={{ duration: 0.2 }}
											className="
											absolute mt-2 w-full z-50
											bg-gray-900 border border-gray-700
											rounded shadow-lg overflow-hidden
											"
										>
											{statuses.map((status) => (
												<ListboxOption
													key={status}
													value={status}
													as={Fragment}
												>
													{({ active, selected }) => (
														<motion.li
															whileHover={{
																scale: 1.02,
															}}
															className={`
															cursor-pointer px-4 py-2 transition-colors
															${
																selected
																	? "bg-blue-500/30 text-blue-400"
																	: active
																		? "bg-blue-500/20 text-blue-400"
																		: "text-gray-100"
															}
														`}
														>
															{status ||
																"All Status"}
														</motion.li>
													)}
												</ListboxOption>
											))}
										</ListboxOptions>
									)}
								</AnimatePresence>
							</div>
						)}
					</Listbox>
				</div>
			</div>
			<br />
			<div className="overflow-y-auto h-78 px-3 scrollbar-custom bg-transparent">
				<table className="min-w-full border-separate border-spacing-0.5 border border-gray-100 bg-transparent table-fixed">
					<thead className="sticky top-0 z-20 bg-red-400 text-gray-900">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="border px-4 py-2 text-left border-gray-100 max-w-49 wrap-break-word"
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
							<motion.tr
								key={row.id}
								className="bg-transparent text-gray-50"
								whileHover={{
									scale: 1.02,
									backgroundColor: "rgba(59,130,246,0.1)",
									boxShadow: "0px 6px 12px rgba(0,0,0,0.08)",
								}}
								initial={{ opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: false, amount: 0.2 }}
								transition={{ duration: 0.35, ease: "easeOut" }}
							>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="border px-4 py-2 border-gray-100 max-w-49 wrap-break-word"
									>
										{flexRender(
											cell.column.columnDef.cell ??
												cell.column.columnDef
													.accessorKey,
											cell.getContext(),
										)}
									</td>
								))}
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
