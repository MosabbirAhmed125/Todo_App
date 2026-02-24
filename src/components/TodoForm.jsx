import { SquarePlus } from "lucide-react";

export default function TodoForm({ newTodo, updateTodoValue, addNewTask }) {
	return (
		<div className="flex flex-col items-center">
			<input
				type="text"
				placeholder="Enter new task"
				value={newTodo}
				onChange={updateTodoValue}
				className="font-bold border-3 border-red-400 rounded-md h-12 w-50 bg-blue-50 text-center transition delay-75 duration-150 ease-in-out focus:scale-110 focus:text-blue-500 focus:outline-none"
			/>
			<br />
			<button
				className="font-bold text-blue-50 text-[18px] bg-blue-500 bg-center rounded-lg p-2 border-transparent transition delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-blue-50 hover:text-blue-500
                hover:shadow-blue-500/50 hover:shadow-lg w-35 h-12 cursor-pointer"
				onClick={addNewTask}
			>
				Add Task
			</button>
		</div>
	);
}
