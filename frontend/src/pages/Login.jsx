import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <-- Added useNavigate

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // <-- Initialize the router

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://inquiry-backend-3pec.onrender.com/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                // 1. Save the VIP token securely in the browser
                localStorage.setItem('token', data.token);
                // 2. Teleport the user to the Dashboard
                navigate('/dashboard');
            } else {
                // If they type the wrong password, tell them!
                alert(data.message);
            }

        } catch (error) {
            alert("Could not connect to the backend server.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Please enter your details to sign in.</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-gray-600">
                            <input type="checkbox" className="mr-2 rounded text-blue-600 focus:ring-blue-500" />
                            Remember me
                        </label>
                        <a href="#" className="text-blue-600 hover:underline font-medium">Forgot password?</a>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4">
                        Sign In
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6 text-sm">
                    Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}