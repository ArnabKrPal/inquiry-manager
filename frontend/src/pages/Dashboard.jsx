import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [inquiries, setInquiries] = useState([]);
    const [error, setError] = useState('');

    // Form State
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProtectedData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/login');

            try {
                const userRes = await fetch('https://inquiry-backend-3pec.onrender.com', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const userDataResult = await userRes.json();

                const inqRes = await fetch('https://inquiry-backend-3pec.onrender.com', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const inqDataResult = await inqRes.json();

                if (userDataResult.success) {
                    setUserData(userDataResult);
                    setInquiries(inqDataResult.inquiries || []);
                } else {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (err) {
                setError('Failed to connect to server.');
            }
        };
        fetchProtectedData();
    }, [navigate]);

    // --- CREATE ---
    const handleCreateInquiry = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('https://inquiry-backend-3pec.onrender.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ customerName, customerEmail, message })
            });
            const data = await res.json();
            if (data.success) {
                setInquiries([data.inquiry, ...inquiries]);
                setCustomerName(''); setCustomerEmail(''); setMessage('');
            }
        } catch (err) { alert('Failed to create inquiry'); }
    };

    // --- UPDATE ---
    const handleUpdateStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'New' ? 'Resolved' : 'New';
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(`https://inquiry-backend-3pec.onrender.com`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await res.json();

            if (data.success) {
                // Update the specific inquiry in our React state so the UI changes instantly
                setInquiries(inquiries.map(inq => inq._id === id ? data.inquiry : inq));
            }
        } catch (err) { alert('Failed to update status'); }
    };

    // --- DELETE ---
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this inquiry?")) return;

        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`https://inquiry-backend-3pec.onrender.com`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();

            if (data.success) {
                // Remove the deleted inquiry from the screen instantly
                setInquiries(inquiries.filter(inq => inq._id !== id));
            }
        } catch (err) { alert('Failed to delete inquiry'); }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (error) return <div className="p-10 text-red-600 font-bold">{error}</div>;
    if (!userData) return <div className="p-10 text-gray-500 animate-pulse">Loading securely...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Inquiry Manager</h1>
                        <p className="text-gray-500 mt-1">Logged in as: <span className="font-semibold text-blue-600">{userData.email}</span></p>
                    </div>
                    <button onClick={handleLogout} className="mt-4 md:mt-0 bg-red-50 text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-100 transition">
                        Log Out
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Form Column */}
                    <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">New Inquiry</h2>
                        <form onSubmit={handleCreateInquiry} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                                <input required type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
                                <input required type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 h-24" placeholder="How can we help?"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                                Save Inquiry
                            </button>
                        </form>
                    </div>

                    {/* List Column */}
                    <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Active Inquiries ({inquiries.length})</h2>

                        {inquiries.length === 0 ? (
                            <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
                                No inquiries yet. Create one on the left!
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                {inquiries.map((inq) => (
                                    <div key={inq._id} className="border border-gray-200 p-5 rounded-lg hover:border-blue-300 transition bg-white">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg">{inq.customerName}</h3>
                                                <p className="text-sm text-blue-600">{inq.customerEmail}</p>
                                            </div>

                                            {/* Dynamic Status Badge */}
                                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${inq.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {inq.status}
                                            </span>
                                        </div>

                                        <p className="text-gray-700 text-sm mb-4 bg-gray-50 p-3 rounded-md border border-gray-100">
                                            "{inq.message}"
                                        </p>

                                        {/* Action Buttons */}
                                        <div className="flex justify-between items-center mt-2 border-t border-gray-100 pt-3">
                                            <p className="text-xs text-gray-400">
                                                {new Date(inq.createdAt).toLocaleString()}
                                            </p>
                                            <div className="space-x-3">
                                                <button
                                                    onClick={() => handleUpdateStatus(inq._id, inq.status)}
                                                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                                >
                                                    {inq.status === 'New' ? 'Mark Resolved' : 'Mark New'}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(inq._id)}
                                                    className="text-sm font-medium text-red-500 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}