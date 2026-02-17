import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Todo() {
	let [todo, setTodo] = useState([]);
	let [newTodo, setNewTodo] = useState("");
	let navigate = useNavigate();
	let [username, setUsername] = useState("");

	let fetchUsername = async () => {
		let {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) return;

		let { data, error } = await supabase
			.from("profiles")
			.select("username")
			.eq("user_id", user.id)
			.single();

		if (error) {
			console.error(error.message);
		} else {
			setUsername(data.username);
		}
	};

	let fetchTodos = async () => {
		let {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) return;

		let { data, error } = await supabase
			.from("todos")
			.select("*")
			.eq("user_id", user.id)
			.order("id", { ascending: false });

		if (error) {
			console.error(error.message);
		} else {
			setTodo(data);
		}
	};

	useEffect(() => {
		fetchUsername();
		fetchTodos();
	}, []);

	let handleLogout = async () => {
		await supabase.auth.signOut();
		navigate("/");
	};

	let addNewTask = async () => {
		let {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) return;

		let { error } = await supabase.from("todos").insert([
			{
				user_id: user.id,
				task: newTodo,
			},
		]);

		if (error) {
			alert(error.message);
			console.log(error.message);
		}

		setNewTodo("");
		fetchTodos();
	};

	let updateTodoValue = (event) => {
		setNewTodo(event.target.value);
	};

	let deleteTask = async (id) => {
		let { error } = await supabase.from("todos").delete().eq("id", id);

		if (error) {
			alert(error.message);
			console.log(error.message);
		}

		fetchTodos();
	};

	let markAsDone = async (id, currentValue) => {
		let { error } = await supabase
			.from("todos")
			.update({ is_done: !currentValue })
			.eq("id", id);

		if (error) {
			alert(error.message);
			console.log(error.message);
		}

		fetchTodos();
	};

	return (
		<div
			className="font-ubuntu font-bold min-h-screen
			bg-[radial-gradient(ellipse_at_bottom,var(--color-gray-700),var(--color-gray-900),black)] 
			flex flex-col items-center justify-center"
		>
			<span className="h-13 w-13 top-13 left-16 text-xl text-gray-950 bg-amber-400 absolute rounded-4xl flex flex-col items-center justify-center">
				{username[0]}
			</span>
			<p className="text-blue-50 text-xl absolute top-16 left-32">
				{username}
			</p>
			<button
				onClick={handleLogout}
				className="font-bold text-blue-50 text-[20px] bg-red-500 bg-center rounded-lg p-2 border-transparent transition delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-blue-50 hover:text-red-500
                hover:shadow-red-500/50 hover:shadow-lg w-25 h-12 cursor-pointer absolute top-30 left-16"
			>
				Logout
			</button>
			<div className="font-ubuntu font-bold flex flex-col items-center">
				<div className="flex flex-row items-center justify-center">
					<img
						src="/favicon.svg"
						alt="Todo Icon"
						className="size-15 mx-3 border-2 border-gray-400 rounded-xl"
					/>
					<p className="text-red-400 text-5xl">Welcome!</p>
				</div>
				<br />
				<br />
				<TodoForm
					newTodo={newTodo}
					updateTodoValue={updateTodoValue}
					addNewTask={addNewTask}
				></TodoForm>
				<br />
				<hr className="w-150 h-1.5 mx-auto my-4 bg-blue-50" />
				<br />
				<p className="text-blue-500 text-3xl">Todo List</p>
				<br />
				<TodoList
					todo={todo}
					markAsDone={markAsDone}
					deleteTask={deleteTask}
				></TodoList>
			</div>
		</div>
	);
}
