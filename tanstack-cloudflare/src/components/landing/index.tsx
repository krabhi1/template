import { Link } from "@tanstack/react-router";

export default function Landing() {
	return (
	<div className="min-h-screen p-4 flex flex-col border border-gray-300">
		<header className="border-b border-gray-200 p-4 flex justify-between items-center">
			<h1 className="text-xl border border-gray-300 px-2 py-1">My App</h1>
        <Link to="/login">
          <button className="border border-gray-300 px-4 py-2">Login</button>
			</Link>
		</header>
		<main className="flex-grow border border-blue-200 p-4"></main>
		<footer className="border-t border-gray-200 p-4"></footer>
	</div>
	);
}
