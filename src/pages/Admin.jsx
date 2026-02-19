import PracticeTable from "../components/Table";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../fonts/Ubuntu-normal";
import "../fonts/Ubuntu-bold";
import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	flexRender,
} from "@tanstack/react-table";

async function fetchTodos() {
	let { data, error } = await supabase.from("todos").select(`
      user_id,
      task,
      is_done,
      profiles (
        username
      )
    `);

	if (error) {
		console.error("Error fetching todos:", error);
		return [];
	}

	return data.map((todo) => ({
		username: todo.profiles.username,
		task: todo.task,
		status: todo.is_done ? "Done" : "Pending",
	}));
}

export default function Admin() {
	let navigate = useNavigate();
	let [todos, setTodos] = useState([]);
	let [columnFilters, setColumnFilters] = useState([]);

	let handleLogout = async () => {
		await supabase.auth.signOut();
		navigate("/");
	};

	useEffect(() => {
		async function loadData() {
			let data = await fetchTodos();
			setTodos(data);
		}
		loadData();
	}, []);

	const columns = React.useMemo(
		() => [
			{
				accessorKey: "username",
				header: "Username",
				filterFn: "includesString",
			},
			{ accessorKey: "task", header: "Task" },
			{
				accessorKey: "status",
				header: "Status",
				filterFn: "equalsString",
			},
		],
		[],
	);

	const table = useReactTable({
		data: todos,
		columns,
		state: {
			columnFilters,
		},
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	const exportToPDF = () => {
		const doc = new jsPDF("p", "mm", "a4");

		doc.setFont("Ubuntu", "bold");
		doc.setFontSize(22);
		doc.text("Admin Todos Report", 105, 20, { align: "center" });

		const tableColumn = ["Username", "Task", "Status"];

		const tableRows = table
			.getRowModel()
			.rows.map((row) => [
				row.original.username,
				row.original.task,
				row.original.status,
			]);

		autoTable(doc, {
			startY: 30,
			head: [tableColumn],
			body: tableRows,
			theme: "grid",

			styles: {
				font: "Ubuntu",
				fontStyle: "normal",
				fontSize: 14,
				halign: "center",
				textColor: [17, 24, 39],
				lineColor: [17, 24, 39],
				lineWidth: 0.3,
			},

			headStyles: {
				font: "Ubuntu",
				fontStyle: "bold",
				fontSize: 16,
				fillColor: [239, 68, 68],
				textColor: 255,
				halign: "center",
			},

			bodyStyles: {
				font: "Ubuntu",
				fontStyle: "normal",
			},
		});

		doc.save("admin_todos_report.pdf");
	};

	return (
		<div
			className="font-ubuntu font-bold h-screen 
			bg-[radial-gradient(ellipse_at_bottom,var(--color-gray-700),var(--color-gray-900),black)] 
			flex flex-col items-center justify-center"
		>
			<span className="h-13 w-13 top-13 left-16 text-xl text-gray-950 bg-amber-400 absolute rounded-4xl flex flex-col items-center justify-center">
				A
			</span>
			<p className="text-blue-50 text-xl absolute top-16 left-32">
				Admin
			</p>
			<button
				onClick={handleLogout}
				className="font-bold text-blue-50 text-[20px] bg-red-500 bg-center rounded-lg p-2 border-transparent transition delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-blue-50 hover:text-red-500
                hover:shadow-red-500/50 hover:shadow-lg w-25 h-12 cursor-pointer absolute top-30 left-16"
			>
				Logout
			</button>
			<button
				onClick={() => {
					navigate("/todo");
				}}
				className="font-bold text-gray-950 text-[20px] bg-amber-400  bg-center rounded-lg p-2 border-transparent transition delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-blue-50 hover:text-amber-400 
					hover:shadow-amber-400/50 hover:shadow-lg w-25 h-12 cursor-pointer absolute top-47 left-16"
			>
				Todos
			</button>
			<div className="flex flex-row items-center justify-center">
				<img
					src="/favicon_alt.svg"
					alt="Todo Icon"
					className="size-13 mx-3"
				/>
				<p className="text-red-400 text-5xl">Admin Panel</p>
			</div>
			<br />
			<br />
			<PracticeTable table={table}></PracticeTable>
			<br />
			<br />
			<button
				onClick={exportToPDF}
				className="font-bold text-gray-950 text-[20px] bg-green-500 rounded-lg px-4 py-2 border-transparent transition delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-blue-50 hover:text-green-500
				hover:shadow-green-500/50 hover:shadow-lg cursor-pointer w-43 h-12 my-2"
			>
				Export as PDF
			</button>
		</div>
	);
}
