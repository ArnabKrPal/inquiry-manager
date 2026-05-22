import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center w-full fixed top-0 z-50">
            <div className="text-2xl font-bold text-blue-600">
                <Link to="/">MyBusiness</Link>
            </div>
            <div className="hidden md:flex space-x-6 text-gray-600">
                <a href="#home" className="hover:text-blue-600">Home</a>
                <a href="#about" className="hover:text-blue-600">About</a>
                <a href="#services" className="hover:text-blue-600">Services</a>
            </div>
            <div>
                <Link to="/login" className="text-blue-600 font-semibold mr-4 hover:underline">Log In</Link>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign Up</button>
            </div>
        </nav>
    );
}