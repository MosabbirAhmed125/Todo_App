import { Check, CircleCheck, Square, SquareCheck, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function TodoList({ todo, markAsDone, deleteTask }) {
	return (
		<div className="overflow-y-auto overflow-x-hidden h-85 max-w-155 scrollbar-custom px-5">
			<ul className="text-pearl-bush-100 text-xl w-full">
				<AnimatePresence>
					{todo.map((todo) => (
						<motion.li
							key={todo.id}
							layout
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, x: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 0.3 }}
							className="my-5 flex items-center w-full"
						>
							<span className="text-red-ribbon-500 mr-4 shrink-0">
								<Square
									className="w-3 h-3"
									fill="currentColor"
									stroke="none"
								/>
							</span>
							{todo.is_done ? (
								<span className="mr-4 text-2xl line-through transition duration-500 ease-in-out opacity-65 flex-1 wrap-break-word w-100">
									{todo.task}
								</span>
							) : (
								<span className="mr-4 text-2xl transition duration-500 ease-in-out opacity-100 flex-1 wrap-break-word w-100">
									{todo.task}
								</span>
							)}
							{todo.is_done ? (
								<button
									onClick={() =>
										markAsDone(todo.id, todo.is_done)
									}
									className="font-bold text-[16px] text-pearl-bush-100 bg-green-400 bg-center border-transparent rounded-lg p-2 transition delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-pearl-bush-100 hover:text-green-400 hover:border-transparent hover:shadow-green-50/50 hover:shadow-lg w-11 h-11 cursor-pointer mx-5 flex flex-col items-center justify-center"
								>
									<Check
										className="w-6 h-6"
										strokeWidth={2.5}
									/>
								</button>
							) : (
								<button
									onClick={() =>
										markAsDone(todo.id, todo.is_done)
									}
									className="font-bold text-[16px] text-pearl-bush-100 bg-transparent bg-center border-2 border-pearl-bush-100 rounded-lg p-2 transition delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-green-400 hover:text-pearl-bush-100 hover:border-transparent hover:shadow-green-400/50 hover:shadow-lg w-11 h-11 cursor-pointer mx-5 flex flex-col items-center justify-center"
								>
									<Check
										className="w-6 h-6"
										strokeWidth={2.5}
									/>
								</button>
							)}
							<button
								onClick={() => deleteTask(todo.id)}
								className="font-bold text-xl text-pearl-bush-100 bg-red-400 bg-center rounded-lg p-2 border-transparent transition delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-pearl-bush-100 hover:text-red-400 hover:shadow-red-400/50 hover:shadow-lg w-11 h-11 cursor-pointer flex flex-col items-center justify-center"
							>
								<Trash2 className="w-6 h-6" strokeWidth={2.5} />
							</button>
						</motion.li>
					))}
				</AnimatePresence>
			</ul>
		</div>
	);
}
