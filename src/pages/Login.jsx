import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
	let navigate = useNavigate();

	let handleLogin = async (event) => {
		event.preventDefault();

		let { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error(error.message);
			alert(error.message);
		} else {
			navigate("/todo");
		}
	};

	return (
		<div
			className="font-ubuntu font-bold h-screen 
			bg-[radial-gradient(ellipse_at_bottom,var(--color-gray-700),var(--color-gray-900),black)] 
			flex flex-col items-center justify-center"
		>
			<p className="text-red-400 text-5xl">Login</p>
			<br />
			<br />
			<form
				onSubmit={handleLogin}
				className="flex flex-col items-center w-80"
			>
				<input
					type="email"
					placeholder="Enter Email"
					onChange={(event) => {
						setEmail(event.target.value);
					}}
					required
					className="font-bold border-3 border-red-400 rounded-md h-12 w-full bg-blue-50 text-center transition delay-75 duration-150 ease-in-out focus:scale-110 focus:text-blue-500 focus:outline-none"
				/>
				<br />
				<input
					type="password"
					placeholder="Enter Password"
					onChange={(event) => {
						setPassword(event.target.value);
					}}
					required
					className="font-bold border-3 border-red-400 rounded-md h-12 w-full bg-blue-50 text-center transition delay-75 duration-150 ease-in-out focus:scale-110 focus:text-blue-500 focus:outline-none"
				/>
				<br />
				<button
					className="font-bold text-blue-50 text-[18px] bg-blue-500 bg-center rounded-lg p-2 border-transparent transition delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-blue-50 hover:text-blue-500
                hover:shadow-blue-500/50 hover:shadow-lg w-30 h-12 cursor-pointer"
				>
					Login
				</button>
			</form>
			<br />
			<p className="text-blue-50 text-lg my-3">Don't have an account?</p>
			<button
				onClick={() => navigate("/signup")}
				className="font-bold text-green-50 text-[18px] bg-green-500 bg-center rounded-lg p-2 border-transparent transition delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-green-50 hover:text-green-500
				hover:shadow-green-500/50 hover:shadow-lg w-30 h-12 cursor-pointer"
			>
				Signup
			</button>
		</div>
	);
}
