import Navbar from '../components/Navbar';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <Navbar />

            <main className="flex flex-col items-center justify-center text-center px-6 py-32">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                    Grow Your Business with Us
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl">
                    We provide industry-leading solutions to help you scale your business faster and more efficiently.
                </p>
                <div className="space-x-4">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition">
                        Get Started
                    </button>
                    <button className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition">
                        Contact Us
                    </button>
                </div>
            </main>

            <About />
            <Services />
            <Testimonials />
            <Contact />
            <Footer />
        </div>
    );
}