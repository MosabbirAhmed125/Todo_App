import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
	let [showPassword, setShowPassword] = useState(false);
	let navigate = useNavigate();

	let handleLogin = async (event) => {
		event.preventDefault();

		let { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error(error.message);
			toast.error(error.message);
		} else {
			toast.success("Login Successful!");
			navigate("/todo");
		}
	};

	return (
		<div
			className="font-ubuntu font-bold h-screen 
			bg-[radial-gradient(ellipse_at_bottom,var(--color-gray-700),var(--color-gray-900),black)] 
			flex flex-col items-center justify-center"
		>
			<div className="flex flex-col text-gray-950 items-center border-2 border-gray-400 p-15 rounded-2xl">
				<div className="flex flex-row items-center justify-center">
					<img
						src="/favicon_alt.svg"
						alt="Todo Icon"
						className="size-13 mx-3"
					/>
					<p className="text-red-400 text-5xl">Login</p>
				</div>
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
						className="font-bold border-3 border-red-400 rounded-md h-12 w-full bg-blue-50 text-left px-3 transition delay-75 duration-150 ease-in-out focus:text-blue-500 focus:outline-none"
					/>
					<br />
					<div className="relative w-full">
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Enter Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="font-bold border-3 border-red-400 rounded-md h-12 w-full bg-blue-50 text-left px-3 transition delay-75 duration-150 ease-in-out focus:text-blue-500 focus:outline-none pr-12"
						/>
						<span
							className="absolute right-11 top-1/2 transform -translate-y-1/2 bg-gray-400"
							style={{ width: "2px", height: "60%" }}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 transform -translate-y-1/2"
						>
							{showPassword ? (
								<EyeOff
									className="w-6 h-6 text-red-400"
									strokeWidth={2.5}
								/>
							) : (
								<Eye
									className="w-6 h-6 text-blue-500"
									strokeWidth={2.5}
								/>
							)}
						</button>
					</div>
					<br />
					<button
						className="font-bold text-blue-50 text-[18px] bg-blue-500 bg-center rounded-lg p-2 border-transparent transition delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-blue-50 hover:text-blue-500
                hover:shadow-blue-500/50 hover:shadow-lg w-30 h-12 cursor-pointer"
					>
						Login
					</button>
				</form>
				<br />
				<p className="text-blue-50 text-lg my-3">
					Don't have an account?
				</p>
				<button
					onClick={() => navigate("/signup")}
					className="font-bold text-green-50 text-[18px] bg-green-500 bg-center rounded-lg p-2 border-transparent transition delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-green-50 hover:text-green-500
				hover:shadow-green-500/50 hover:shadow-lg w-30 h-12 cursor-pointer"
				>
					Signup
				</button>
			</div>
		</div>
	);
}
