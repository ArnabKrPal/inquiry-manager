export default function Services() {
    const servicesList = [
        { title: "Web Development", desc: "Custom, responsive, and fast-loading websites built with modern frameworks." },
        { title: "App Development", desc: "Cross-platform mobile applications to engage your users on the go." },
        { title: "UI/UX Design", desc: "Beautiful, intuitive, and user-centric designs that convert." }
    ];

    return (
        <section id="services" className="py-20 bg-gray-50 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Services</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {servicesList.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                            <h3 className="text-xl font-semibold text-blue-600 mb-4">{service.title}</h3>
                            <p className="text-gray-600">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}