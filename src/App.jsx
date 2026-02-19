import "./index.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";
import Admin from "./pages/Admin";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

function App() {
	let [session, setSession] = useState(null);
	let [loading, setLoading] = useState(true);

	useEffect(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setLoading(false);
		});

		let { data: listener } = supabase.auth.onAuthStateChange(
			(_event, supabaseSession) => {
				setSession(supabaseSession);
			},
		);

		return () => {
			listener.subscription.unsubscribe();
		};
	}, []);

	if (loading) return <p>Loading...</p>;

	return (
		<Routes>
			<Route
				path="/"
				element={!session ? <Login></Login> : <Navigate to="/todo" />}
			/>
			<Route
				path="/signup"
				element={!session ? <Signup></Signup> : <Navigate to="/todo" />}
			/>
			<Route
				path="/todo"
				element={session ? <Todo></Todo> : <Navigate to="/" />}
			/>
			<Route path="/admin" element={<Admin />} />
		</Routes>
	);
}

export default App;
