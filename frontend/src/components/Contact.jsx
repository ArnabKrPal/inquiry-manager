export default function Contact() {
    return (
        <section id="contact" className="py-20 bg-gray-50 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                    <p className="text-gray-600">Have a project in mind? We would love to hear from you.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    {/* Contact Details */}
                    <div className="flex flex-col justify-center space-y-6">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900">Email Us</h4>
                            <p className="text-blue-600">hello@mybusiness.com</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900">Call Us</h4>
                            <p className="text-gray-600">+1 (555) 123-4567</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900">Location</h4>
                            <p className="text-gray-600">123 Business Avenue<br />Tech City, TC 90210</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form className="flex flex-col space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text" className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 h-32" placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="button" className="bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}