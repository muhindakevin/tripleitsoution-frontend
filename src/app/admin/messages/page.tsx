"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}

interface ReplyModalProps {
    message: Message | null;
    isOpen: boolean;
    onClose: () => void;
    onSend: (replyData: { to: string; subject: string; body: string }) => void;
}

const ReplyModal = ({ message, isOpen, onClose, onSend }: ReplyModalProps) => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (message) {
            setSubject(`Re: Message from ${message.name}`);
            setBody(`Dear ${message.name},\n\nThank you for your message:\n"${message.message}"\n\nBest regards,\nAdmin Team`);
        }
    }, [message]);

    const handleSend = async () => {
        if (!message || !subject.trim() || !body.trim()) return;

        setIsLoading(true);
        try {
            await onSend({
                to: message.email,
                subject: subject.trim(),
                body: body.trim()
            });
            onClose();
        } catch (error) {
            console.error('Failed to send reply:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen || !message) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Reply to Message</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        disabled={isLoading}
                    >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    {/* Original Message */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Original Message</h3>
                        <div className="space-y-2 text-sm">
                            <p><span className="font-medium">From:</span> {message.name} ({message.email})</p>
                            <p><span className="font-medium">Date:</span> {new Date(message.createdAt).toLocaleString()}</p>
                            <div className="mt-3">
                                <p className="font-medium mb-1">Message:</p>
                                <p className="text-gray-700 bg-white p-3 rounded border">{message.message}</p>
                            </div>
                        </div>
                    </div>

                    {/* Reply Form */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">To:</label>
                            <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-xs">
                                        {message.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{message.name}</p>
                                    <p className="text-sm text-gray-600">{message.email}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject:</label>
                            <input
                                id="subject"
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Email subject"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label htmlFor="body" className="block text-sm font-semibold text-gray-700 mb-2">Message:</label>
                            <textarea
                                id="body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                rows={8}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                placeholder="Type your reply here..."
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !subject.trim() || !body.trim()}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Sending...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                Send Reply
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

const AdminMessagesPage = () => {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [replyModal, setReplyModal] = useState<{ isOpen: boolean; message: Message | null }>({
        isOpen: false,
        message: null
    });
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const messagesPerPage = 10;

    // Sample data - replace with your actual API calls
    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            // Replace with your actual API call
            // const response = await fetch('/api/messages');
            // const data = await response.json();

            // Sample data for demonstration
            const sampleMessages: Message[] = [
                {
                    _id: '1',
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    message: 'Hello, I have a question about your services. Could you please provide more information about pricing and availability?',
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    updatedAt: new Date(Date.now() - 86400000).toISOString()
                },
                {
                    _id: '2',
                    name: 'Sarah Smith',
                    email: 'sarah.smith@example.com',
                    message: 'I\'m interested in your product catalog. Can you send me the latest brochure?',
                    createdAt: new Date(Date.now() - 172800000).toISOString(),
                    updatedAt: new Date(Date.now() - 172800000).toISOString()
                },
                {
                    _id: '3',
                    name: 'Mike Johnson',
                    email: 'mike.johnson@example.com',
                    message: 'There seems to be an issue with my recent order. The tracking number is not working.',
                    createdAt: new Date(Date.now() - 259200000).toISOString(),
                    updatedAt: new Date(Date.now() - 259200000).toISOString()
                }
            ];

            setMessages(sampleMessages);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (messageId: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        setActionLoading(messageId);
        try {
            // Replace with your actual API call
            // await fetch(`/api/messages/${messageId}`, { method: 'DELETE' });

            setMessages(prev => prev.filter(msg => msg._id !== messageId));
            setSelectedMessages(prev => prev.filter(id => id !== messageId));
        } catch (error) {
            console.error('Failed to delete message:', error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleBulkDelete = async () => {
        if (selectedMessages.length === 0) return;
        if (!confirm(`Are you sure you want to delete ${selectedMessages.length} message(s)?`)) return;

        setActionLoading('bulk');
        try {
            // Replace with your actual API call
            // await Promise.all(selectedMessages.map(id => 
            //     fetch(`/api/messages/${id}`, { method: 'DELETE' })
            // ));

            setMessages(prev => prev.filter(msg => !selectedMessages.includes(msg._id)));
            setSelectedMessages([]);
        } catch (error) {
            console.error('Failed to delete messages:', error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleReply = (message: Message) => {
        setReplyModal({ isOpen: true, message });
    };

    const handleSendReply = async (replyData: { to: string; subject: string; body: string }) => {
        try {
            // Replace with your actual email API call
            // await fetch('/api/send-email', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(replyData)
            // });

            console.log('Email sent:', replyData);
            alert('Reply sent successfully!');
        } catch (error) {
            console.error('Failed to send reply:', error);
            alert('Failed to send reply. Please try again.');
        }
    };

    const handleSelectMessage = (messageId: string) => {
        setSelectedMessages(prev =>
            prev.includes(messageId)
                ? prev.filter(id => id !== messageId)
                : [...prev, messageId]
        );
    };

    const handleSelectAll = () => {
        const currentMessages = getCurrentPageMessages();
        const allSelected = currentMessages.every(msg => selectedMessages.includes(msg._id));

        if (allSelected) {
            setSelectedMessages(prev => prev.filter(id => !currentMessages.some(msg => msg._id === id)));
        } else {
            setSelectedMessages(prev => [...new Set([...prev, ...currentMessages.map(msg => msg._id)])]);
        }
    };

    const filteredMessages = messages.filter(message =>
        message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getCurrentPageMessages = () => {
        const startIndex = (currentPage - 1) * messagesPerPage;
        return filteredMessages.slice(startIndex, startIndex + messagesPerPage);
    };

    const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);
    const currentMessages = getCurrentPageMessages();

    if (loading) {
        return (
            <div className="w-full bg-gray-50 min-h-screen">
                <div className="px-6 py-8">
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <div className="px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages Management</h1>
                    <p className="text-gray-600">Manage and respond to customer messages</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{messages.length}</h3>
                                <p className="text-gray-600 text-sm">Total Messages</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{selectedMessages.length}</h3>
                                <p className="text-gray-600 text-sm">Selected Messages</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{messages.filter(m => new Date(m.createdAt) > new Date(Date.now() - 86400000)).length}</h3>
                                <p className="text-gray-600 text-sm">Today's Messages</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        {/* Search */}
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                                <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            {selectedMessages.length > 0 && (
                                <button
                                    onClick={handleBulkDelete}
                                    disabled={actionLoading === 'bulk'}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium"
                                >
                                    {actionLoading === 'bulk' ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    )}
                                    Delete Selected ({selectedMessages.length})
                                </button>
                            )}

                            <button
                                onClick={fetchMessages}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh
                            </button>
                        </div>
                    </div>
                </div>

                {/* Messages Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {currentMessages.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
                            <p className="text-gray-500">
                                {searchQuery ? 'Try adjusting your search criteria.' : 'No messages have been received yet.'}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="text-left py-4 px-6 w-12">
                                                <input
                                                    type="checkbox"
                                                    checked={currentMessages.length > 0 && currentMessages.every(msg => selectedMessages.includes(msg._id))}
                                                    onChange={handleSelectAll}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                            </th>
                                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wide">Sender</th>
                                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wide">Message</th>
                                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wide">Date</th>
                                            <th className="text-right py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {currentMessages.map((message) => (
                                            <tr key={message._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedMessages.includes(message._id)}
                                                        onChange={() => handleSelectMessage(message._id)}
                                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                            <span className="text-white font-semibold text-sm">
                                                                {message.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{message.name}</p>
                                                            <p className="text-sm text-gray-500">{message.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <p className="text-gray-900 line-clamp-2 max-w-md">{message.message}</p>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <p className="text-sm text-gray-500">{new Date(message.createdAt).toLocaleDateString()}</p>
                                                    <p className="text-xs text-gray-400">{new Date(message.createdAt).toLocaleTimeString()}</p>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleReply(message)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Reply via email"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(message._id)}
                                                            disabled={actionLoading === message._id}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                            title="Delete message"
                                                        >
                                                            {actionLoading === message._id ? (
                                                                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                                            ) : (
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                                    <div className="text-sm text-gray-500">
                                        Showing {((currentPage - 1) * messagesPerPage) + 1} to {Math.min(currentPage * messagesPerPage, filteredMessages.length)} of {filteredMessages.length} messages
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-2 text-sm font-medium rounded-lg ${currentPage === page
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Reply Modal */}
            <ReplyModal
                message={replyModal.message}
                isOpen={replyModal.isOpen}
                onClose={() => setReplyModal({ isOpen: false, message: null })}
                onSend={handleSendReply}
            />
        </div>
    )
}

export default AdminMessagesPage;