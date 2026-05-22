export default function Testimonials() {
    const reviews = [
        {
            name: "Sarah Jenkins",
            role: "CEO, TechFlow",
            text: "This team completely transformed our online presence. Our user engagement doubled in just two months!",
            rating: "★★★★★"
        },
        {
            name: "Marcus Doe",
            role: "Founder, StartupX",
            text: "Incredible UI/UX design. The attention to detail and lightning-fast delivery was beyond our expectations.",
            rating: "★★★★★"
        }
    ];

    return (
        <section id="testimonials" className="py-20 bg-white px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-12">Client Success Stories</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
                            <div className="text-yellow-400 text-2xl mb-4">{review.rating}</div>
                            <p className="text-gray-600 italic mb-6">"{review.text}"</p>
                            <div>
                                <h4 className="font-bold text-gray-900">{review.name}</h4>
                                <p className="text-sm text-gray-500">{review.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}