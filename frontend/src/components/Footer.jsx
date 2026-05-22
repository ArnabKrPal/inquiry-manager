export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">MyBusiness</h3>
                    <p className="text-gray-400">Providing industry-leading digital solutions to help you scale faster.</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <div className="flex flex-col space-y-2 text-gray-400">
                        <a href="#home" className="hover:text-blue-400">Home</a>
                        <a href="#about" className="hover:text-blue-400">About Us</a>
                        <a href="#services" className="hover:text-blue-400">Services</a>
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                    <div className="flex flex-col space-y-2 text-gray-400">
                        <a href="#" className="hover:text-blue-400">Twitter</a>
                        <a href="#" className="hover:text-blue-400">LinkedIn</a>
                        <a href="#" className="hover:text-blue-400">GitHub</a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} MyBusiness. All rights reserved.
            </div>
        </footer>
    );
}