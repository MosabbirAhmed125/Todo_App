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

export default function Table({ table }) {
	const statuses = ["", "Done", "Pending"];
	const statusValue = table.getColumn("status")?.getFilterValue() ?? "";

	const rows = table.getRowModel().rows;

	// ---- Container Animation ----
	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				when: "beforeChildren",
				staggerChildren: 0.05,
			},
		},
	};

	const rowVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -10 },
	};

	return (
		<motion.div
			className="w-130 mx-auto pb-6 flex flex-col gap-6"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{/* ================= PREMIUM CONTROLS ================= */}
			<div className="w-full flex gap-4">
				{/* Search */}
				<motion.input
					layout
					type="text"
					placeholder="Search by username..."
					value={table.getColumn("username")?.getFilterValue() ?? ""}
					onChange={(e) =>
						table
							.getColumn("username")
							?.setFilterValue(e.target.value)
					}
					className="flex-1 px-4 py-3 border-2 border-sky-500/40 
					text-pearl-bush-100 rounded-xl bg-gray-950
					focus:outline-none placeholder:text-gray-400"
					whileFocus={{
						scale: 1.01,
						boxShadow: "0 0 0 2px rgba(56,189,248,0.4)",
					}}
					transition={{ type: "spring", stiffness: 300, damping: 25 }}
				/>

				{/* Dropdown */}
				<div className="relative w-60">
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
										layout
										className={`w-full px-4 py-3 border-2 rounded-xl
										text-pearl-bush-100 text-left flex items-center justify-between
										bg-gray-950 focus:outline-none
										${open || statusValue ? "border-sky-500" : "border-sky-500/40"}`}
										whileFocus={{
											boxShadow:
												"0 0 0 2px rgba(56,189,248,0.4)",
										}}
									>
										<span>
											{statusValue || "All Status"}
										</span>

										<motion.div
											animate={{ rotate: open ? 180 : 0 }}
											transition={{ duration: 0.2 }}
										>
											<ChevronDown className="w-4 h-4 text-sky-400" />
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
											className="absolute mt-2 w-full z-50
											bg-gray-900 border border-sky-500/40
											rounded-xl shadow-xl overflow-hidden"
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
															className={`cursor-pointer px-4 py-3 transition-colors
															${
																selected
																	? "bg-sky-500/30 text-sky-300"
																	: active
																		? "bg-sky-500/20 text-sky-300"
																		: "text-pearl-bush-100"
															}`}
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

			{/* ================= PREMIUM TABLE ================= */}
			<motion.div
				layout
				className="bg-transparent rounded-2xl border-2 border-sky-500/50
				overflow-hidden drop-shadow-sky-500/50 drop-shadow-2xl"
			>
				<motion.div
					layout
					className="max-h-81 w-full overflow-y-auto overflow-x-hidden scrollbar-hide"
				>
					<table className="min-w-full text-sm text-pearl-bush-50 border-collapse table-fixed">
						<thead className="bg-gray-900 sticky top-0 z-10">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr
									key={headerGroup.id}
									className="border-b border-gray-800"
								>
									{headerGroup.headers.map(
										(header, index) => (
											<th
												key={header.id}
												className="relative px-6 py-4 text-left font-semibold text-sky-400"
											>
												{flexRender(
													header.column.columnDef
														.header,
													header.getContext(),
												)}

												{index !==
													headerGroup.headers.length -
														1 && (
													<span className="absolute right-0 top-3 bottom-3 w-0.5 bg-gray-400" />
												)}
											</th>
										),
									)}
								</tr>
							))}
						</thead>

						<motion.tbody layout>
							<AnimatePresence mode="popLayout">
								{rows.map((row) => (
									<motion.tr
										layout
										key={row.id}
										variants={rowVariants}
										initial="hidden"
										animate="visible"
										exit="exit"
										transition={{ duration: 0.3 }}
										whileHover={{
											scale: 1.01,
											transition: { duration: 0.2 },
										}}
										className="border-b bg-gray-950 border-gray-900 hover:bg-gray-900/60"
									>
										{row
											.getVisibleCells()
											.map((cell, index) => (
												<td
													key={cell.id}
													className="relative px-6 py-3 wrap-break-word align-top"
												>
													{flexRender(
														cell.column.columnDef
															.cell ??
															cell.column
																.columnDef
																.accessorKey,
														cell.getContext(),
													)}

													{index !==
														row.getVisibleCells()
															.length -
															1 && (
														<span className="absolute right-0 top-2 bottom-2 w-0.5 bg-gray-700/70" />
													)}
												</td>
											))}
									</motion.tr>
								))}
							</AnimatePresence>
						</motion.tbody>
					</table>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
