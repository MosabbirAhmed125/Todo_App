export default function TodoList({ todo, markAsDone, deleteTask }) {
	return (
		<div className="overflow-y-auto h-85 scrollbar-custom px-5">
			<ul className="text-blue-50 text-xl">
				{todo.map((todo) => (
					<li key={todo.id} className="my-5 flex items-center w-full">
						<span className="text-red-400 mr-4 text-2xl">■</span>
						{todo.is_done ? (
							<span
								className="mr-4 text-2xl line-through transition 
                                duration-500 ease-in-out opacity-65 flex-1"
							>
								{todo.task}
							</span>
						) : (
							<span
								className="mr-4 text-2xl transition 
                                duration-500 ease-in-out opacity-100 flex-1"
							>
								{todo.task}
							</span>
						)}
						{todo.is_done ? (
							<button
								onClick={() =>
									markAsDone(todo.id, todo.is_done)
								}
								className="font-bold text-[16px] text-blue-50 bg-green-400 bg-center border-transparent rounded-lg p-2 transition delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-green-50 hover:text-green-400 hover:border-transparent
                                    hover:shadow-green-50/50 hover:shadow-lg w-11 h-11 cursor-pointer mx-5"
							>
								✓
							</button>
						) : (
							<button
								onClick={() =>
									markAsDone(todo.id, todo.is_done)
								}
								className="font-bold text-[16px] text-green-50 bg-transparent bg-center border-2 border-green-50 rounded-lg p-2 transition delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-green-400 hover:text-green-50 hover:border-transparent
                                hover:shadow-green-400/50 hover:shadow-lg w-11 h-11 cursor-pointer mx-5"
							>
								✓
							</button>
						)}
						<button
							onClick={() => deleteTask(todo.id)}
							className="font-bold text-xl text-blue-50 bg-red-400 bg-center rounded-lg p-2 border-transparent transition delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-blue-50 hover:text-red-400
                            hover:shadow-red-400/50 hover:shadow-lg w-11 h-11 cursor-pointer"
						>
							✕
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
