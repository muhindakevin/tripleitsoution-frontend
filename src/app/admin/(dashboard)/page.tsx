"use client"
import React, { useState } from 'react'
import Image from 'next/image'

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    stock: number;
    status: 'active' | 'inactive';
    category: string;
}

interface Message {
    id: number;
    sender: string;
    subject: string;
    preview: string;
    timestamp: string;
    isRead: boolean;
    priority: 'high' | 'medium' | 'low';
}

const DashboardOverview = () => {
    // Sample data - replace with your actual data fetching
    const [products] = useState<Product[]>([
        {
            id: 1,
            name: "Wireless Headphones",
            price: 99.99,
            image: "/api/placeholder/80/80",
            stock: 45,
            status: 'active',
            category: "Electronics"
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 199.99,
            image: "/api/placeholder/80/80",
            stock: 23,
            status: 'active',
            category: "Electronics"
        },
        {
            id: 3,
            name: "Coffee Mug",
            price: 15.99,
            image: "/api/placeholder/80/80",
            stock: 0,
            status: 'inactive',
            category: "Home"
        },
        {
            id: 4,
            name: "Laptop Stand",
            price: 49.99,
            image: "/api/placeholder/80/80",
            stock: 12,
            status: 'active',
            category: "Office"
        }
    ]);

    const [messages] = useState<Message[]>([
        {
            id: 1,
            sender: "John Smith",
            subject: "Order Inquiry #12345",
            preview: "Hi, I wanted to check the status of my recent order...",
            timestamp: "2 minutes ago",
            isRead: false,
            priority: 'high'
        },
        {
            id: 2,
            sender: "Sarah Johnson",
            subject: "Product Review Request",
            preview: "Could you please review the new product specifications for...",
            timestamp: "1 hour ago",
            isRead: false,
            priority: 'medium'
        },
        {
            id: 3,
            sender: "Mike Wilson",
            subject: "Meeting Reminder",
            preview: "Don't forget about our scheduled meeting tomorrow at 2 PM...",
            timestamp: "3 hours ago",
            isRead: true,
            priority: 'low'
        },
        {
            id: 4,
            sender: "Emma Davis",
            subject: "Invoice #INV-2024-001",
            preview: "Please find attached the invoice for your recent purchase...",
            timestamp: "1 day ago",
            isRead: true,
            priority: 'medium'
        }
    ]);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: string) => {
        return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            {/* Main Content Container - matching navbar padding */}
            <div className="px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
                    <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <span className="text-green-500 text-sm font-medium">+12.5%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">1,234</h3>
                        <p className="text-gray-600 text-sm">Total Products</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <span className="text-green-500 text-sm font-medium">+8.2%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">$45,678</h3>
                        <p className="text-gray-600 text-sm">Total Revenue</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <span className="text-green-500 text-sm font-medium">+15.3%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">856</h3>
                        <p className="text-gray-600 text-sm">Total Orders</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-red-500 text-sm font-medium">-2.1%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{messages.filter(m => !m.isRead).length}</h3>
                        <p className="text-gray-600 text-sm">Unread Messages</p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Products Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">Recent Products</h2>
                                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors">
                                        View All
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wide">Product</th>
                                            <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wide">Price</th>
                                            <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wide">Stock</th>
                                            <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {products.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{product.name}</p>
                                                            <p className="text-sm text-gray-500">{product.category}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="font-semibold text-gray-900">${product.price}</span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                        {product.stock} units
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                                                        {product.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Messages Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">Recent Messages</h2>
                                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors">
                                        View All
                                    </button>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                                {messages.map((message) => (
                                    <div key={message.id} className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${!message.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}>
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-semibold text-xs">
                                                        {message.sender.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">{message.sender}</p>
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                                                        {message.priority}
                                                    </span>
                                                </div>
                                            </div>
                                            {!message.isRead && (
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            )}
                                        </div>
                                        <h4 className="font-medium text-gray-900 text-sm mb-1">{message.subject}</h4>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-2">{message.preview}</p>
                                        <p className="text-xs text-gray-500">{message.timestamp}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardOverview;