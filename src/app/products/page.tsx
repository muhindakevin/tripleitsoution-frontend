'use client';
import React, { useState } from 'react';
import {
    Monitor, Mouse, Keyboard, Headphones, Smartphone, Tablet,
    Printer, Server, Shield, Cloud, Code, Settings, Users,
    Briefcase, Search, Filter, Star, ChevronDown, ChevronUp,
    ShoppingCart, Heart, Eye, Check, X, Plus, Minus
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Product {
    id: string;
    name: string;
    category: string;
    subcategory: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    image: string;
    description: string;
    features: string[];
    inStock: boolean;
    isFeatured?: boolean;
    tags: string[];
}

interface FilterOption {
    id: string;
    name: string;
    options: string[];
}

// Sample product data
const products: Product[] = [
    {
        id: 'prod-001',
        name: 'Premium Business Laptop',
        category: 'Hardware',
        subcategory: 'Laptops',
        price: 1299.99,
        originalPrice: 1499.99,
        rating: 4.7,
        reviewCount: 142,
        image: '/images/products/macbook.jpg',
        description: 'Powerful business laptop with latest processor, 16GB RAM, and 512GB SSD for optimal performance.',
        features: ['Intel Core i7 Processor', '16GB DDR4 RAM', '512GB NVMe SSD', '15.6" FHD Display', 'Windows 11 Pro'],
        inStock: true,
        isFeatured: true,
        tags: ['Business', 'Premium', 'New']
    },
    {
        id: 'prod-002',
        name: 'Ergonomic Mechanical Keyboard',
        category: 'Hardware',
        subcategory: 'Keyboards',
        price: 89.99,
        rating: 4.5,
        reviewCount: 87,
        image: '/images/products/keyboard.jpeg',
        description: 'Comfortable mechanical keyboard with RGB lighting and ergonomic design for long typing sessions.',
        features: ['Cherry MX Brown Switches', 'RGB Backlight', 'Ergonomic Design', 'USB-C Connectivity', 'Media Controls'],
        inStock: true,
        tags: ['Ergonomic', 'Mechanical']
    },
    {
        id: 'prod-003',
        name: 'Wireless Noise-Cancelling Headphones',
        category: 'Hardware',
        subcategory: 'Headphones',
        price: 199.99,
        originalPrice: 249.99,
        rating: 4.8,
        reviewCount: 215,
        image: '/images/products/headphones.jpeg',
        description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
        features: ['Active Noise Cancellation', '30-hour Battery', 'Bluetooth 5.0', 'Built-in Microphone', 'Foldable Design'],
        inStock: true,
        isFeatured: true,
        tags: ['Wireless', 'Noise-Cancelling', 'Best Seller']
    },
    {
        id: 'prod-004',
        name: 'Business Cloud Suite',
        category: 'Software Solutions',
        subcategory: 'Cloud Solutions',
        price: 24.99,
        rating: 4.6,
        reviewCount: 56,
        image: '/images/products/cloud.png',
        description: 'Comprehensive cloud solution for businesses with storage, collaboration tools, and security features.',
        features: ['1TB Storage', 'User Management', 'Collaboration Tools', 'Advanced Security', '24/7 Support'],
        inStock: true,
        tags: ['Cloud', 'Subscription']
    },
    {
        id: 'prod-005',
        name: 'High-Performance Server',
        category: 'Hardware',
        subcategory: 'Servers',
        price: 3499.99,
        rating: 4.9,
        reviewCount: 32,
        image: '/images/products/server.png',
        description: 'Enterprise-grade server with dual processors, high RAM capacity, and redundant storage options.',
        features: ['Dual Xeon Processors', '128GB ECC RAM', 'Hot-swap Drive Bays', 'Redundant PSU', 'Remote Management'],
        inStock: false,
        tags: ['Enterprise', 'Server']
    },
    {
        id: 'prod-006',
        name: 'IT Security Suite',
        category: 'Software Solutions',
        subcategory: 'Security Software',
        price: 45.99,
        rating: 4.7,
        reviewCount: 124,
        image: '/images/products/security.png',
        description: 'Comprehensive security solution with antivirus, firewall, and endpoint protection for businesses.',
        features: ['Antivirus Protection', 'Firewall', 'Endpoint Security', 'Data Encryption', 'Threat Detection'],
        inStock: true,
        isFeatured: true,
        tags: ['Security', 'Essential']
    },
    {
        id: 'prod-007',
        name: 'Professional Monitor 27"',
        category: 'Hardware',
        subcategory: 'Monitors',
        price: 399.99,
        originalPrice: 449.99,
        rating: 4.6,
        reviewCount: 78,
        image: '/images/products/monitor.jpeg',
        description: '27-inch 4K professional monitor with accurate color reproduction and ergonomic stand.',
        features: ['27" 4K Display', 'IPS Panel', '99% sRGB', 'Adjustable Stand', 'Multiple Inputs'],
        inStock: true,
        tags: ['4K', 'Professional']
    },
    {
        id: 'prod-008',
        name: 'IT Consulting Package',
        category: 'Services',
        subcategory: 'IT Consulting',
        price: 1999.99,
        rating: 4.9,
        reviewCount: 45,
        image: '/images/products/consultancy.jpg',
        description: 'Comprehensive IT consulting package including infrastructure assessment and technology roadmap.',
        features: ['Infrastructure Assessment', 'Technology Roadmap', 'Security Audit', 'Implementation Plan', 'Ongoing Support'],
        inStock: true,
        tags: ['Consulting', 'Professional Services']
    }
];

const filters: FilterOption[] = [
    {
        id: 'category',
        name: 'Category',
        options: ['Hardware', 'Software Solutions', 'Services']
    },
    {
        id: 'price',
        name: 'Price',
        options: ['Under $100', '$100 - $500', '$500 - $1000', 'Over $1000']
    },
    {
        id: 'availability',
        name: 'Availability',
        options: ['In Stock', 'Out of Stock']
    },
    {
        id: 'rating',
        name: 'Rating',
        options: ['4+ Stars', '4.5+ Stars']
    }
];

const categories = [
    {
        name: 'Hardware',
        icon: Monitor,
        subcategories: ['Laptops', 'Desktops', 'Monitors', 'Keyboards', 'Mouse', 'Headphones', 'Printers', 'Servers']
    },
    {
        name: 'Software Solutions',
        icon: Code,
        subcategories: ['Business Applications', 'Security Software', 'Cloud Solutions', 'Custom Development', 'System Management']
    },
    {
        name: 'Services',
        icon: Users,
        subcategories: ['IT Consulting', 'Technical Support', 'System Integration', 'Cloud Migration', 'Security Audit']
    }
];

const ProductsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortOption, setSortOption] = useState<string>('featured');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [itemsPerPage, setItemsPerPage] = useState<number>(8);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Filter products based on selected filters, category, and search query
    const filteredProducts = products.filter(product => {
        // Category filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
            return false;
        }

        // Search query filter
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        // Active filters
        for (const [filterKey, filterValues] of Object.entries(activeFilters)) {
            if (filterValues.length > 0) {
                if (filterKey === 'category' && !filterValues.includes(product.category)) {
                    return false;
                }
                if (filterKey === 'price') {
                    const price = product.price;
                    if (filterValues.includes('Under $100') && price >= 100) return false;
                    if (filterValues.includes('$100 - $500') && (price < 100 || price > 500)) return false;
                    if (filterValues.includes('$500 - $1000') && (price < 500 || price > 1000)) return false;
                    if (filterValues.includes('Over $1000') && price <= 1000) return false;
                }
                if (filterKey === 'availability') {
                    if (filterValues.includes('In Stock') && !product.inStock) return false;
                    if (filterValues.includes('Out of Stock') && product.inStock) return false;
                }
                if (filterKey === 'rating') {
                    if (filterValues.includes('4+ Stars') && product.rating < 4) return false;
                    if (filterValues.includes('4.5+ Stars') && product.rating < 4.5) return false;
                }
            }
        }

        return true;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === 'price-low') return a.price - b.price;
        if (sortOption === 'price-high') return b.price - a.price;
        if (sortOption === 'rating') return b.rating - a.rating;
        // Default: featured first
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const toggleFilter = (filterId: string, option: string) => {
        setActiveFilters(prev => {
            const currentFilters = prev[filterId] || [];
            if (currentFilters.includes(option)) {
                return {
                    ...prev,
                    [filterId]: currentFilters.filter(item => item !== option)
                };
            } else {
                return {
                    ...prev,
                    [filterId]: [...currentFilters, option]
                };
            }
        });
        setCurrentPage(1); // Reset to first page when filters change
    };

    const clearFilters = () => {
        setActiveFilters({});
        setSelectedCategory('All');
        setSearchQuery('');
        setCurrentPage(1);
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map(star => (
                    <Star
                        key={star}
                        className={`h-4 w-4 ${star <= Math.floor(rating)
                            ? 'text-yellow-400 fill-current'
                            : star === Math.ceil(rating) && rating % 1 >= 0.5
                                ? 'text-yellow-400 fill-half'
                                : 'text-gray-300'
                            }`}
                    />
                ))}
                <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
            </div>
        );
    };

    return (
        <>
            <Header />
            <br/><br/><br/>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
                                <p className="mt-2 text-gray-600">
                                    Discover our comprehensive range of IT solutions for your business
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar filters */}
                        <div className="md:w-64">
                            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Clear all
                                    </button>
                                </div>

                                {/* Category filter */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-gray-900 font-medium mb-3">Categories</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <input
                                                id="category-all"
                                                name="category"
                                                type="radio"
                                                checked={selectedCategory === 'All'}
                                                onChange={() => setSelectedCategory('All')}
                                                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label
                                                htmlFor="category-all"
                                                className="ml-3 text-sm text-gray-600"
                                            >
                                                All Categories
                                            </label>
                                        </div>
                                        {categories.map((category) => (
                                            <div key={category.name} className="flex items-center">
                                                <input
                                                    id={`category-${category.name}`}
                                                    name="category"
                                                    type="radio"
                                                    checked={selectedCategory === category.name}
                                                    onChange={() => setSelectedCategory(category.name)}
                                                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor={`category-${category.name}`}
                                                    className="ml-3 text-sm text-gray-600"
                                                >
                                                    {category.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Other filters */}
                                {filters.map((filter) => (
                                    <div key={filter.id} className="border-t border-gray-200 pt-6">
                                        <h3 className="text-gray-900 font-medium mb-3">{filter.name}</h3>
                                        <div className="space-y-2">
                                            {filter.options.map((option) => (
                                                <div key={option} className="flex items-center">
                                                    <input
                                                        id={`${filter.id}-${option}`}
                                                        name={`${filter.id}[]`}
                                                        type="checkbox"
                                                        checked={activeFilters[filter.id]?.includes(option) || false}
                                                        onChange={() => toggleFilter(filter.id, option)}
                                                        className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <label
                                                        htmlFor={`${filter.id}-${option}`}
                                                        className="ml-3 text-sm text-gray-600"
                                                    >
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="flex-1">
                            {/* Toolbar */}
                            <div className="bg-white rounded-lg shadow p-4 mb-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="hidden md:flex space-x-1">
                                            <button
                                                onClick={() => setViewMode('grid')}
                                                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                            >
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => setViewMode('list')}
                                                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                            >
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                                            <span className="font-medium">
                                                {Math.min(currentPage * itemsPerPage, sortedProducts.length)}
                                            </span>{' '}
                                            of <span className="font-medium">{sortedProducts.length}</span> results
                                        </p>
                                    </div>
                                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">
                                                Sort by:
                                            </label>
                                            <select
                                                id="sort"
                                                className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                value={sortOption}
                                                onChange={(e) => setSortOption(e.target.value)}
                                            >
                                                <option value="featured">Featured</option>
                                                <option value="price-low">Price: Low to High</option>
                                                <option value="price-high">Price: High to Low</option>
                                                <option value="rating">Rating</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center">
                                            <label htmlFor="items-per-page" className="mr-2 text-sm font-medium text-gray-700">
                                                Show:
                                            </label>
                                            <select
                                                id="items-per-page"
                                                className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                value={itemsPerPage}
                                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                            >
                                                <option value="8">8</option>
                                                <option value="16">16</option>
                                                <option value="24">24</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Products grid/list */}
                            {paginatedProducts.length === 0 ? (
                                <div className="bg-white rounded-lg shadow p-8 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            vectorEffect="non-scaling-stroke"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Try adjusting your search or filter to find what you're looking for.
                                    </p>
                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Clear all filters
                                        </button>
                                    </div>
                                </div>
                            ) : viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {paginatedProducts.map((product) => (
                                        <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
                                            <div className="relative">
                                                <div className="h-48 bg-gray-200 overflow-hidden">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                {product.isFeatured && (
                                                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
                                                        Featured
                                                    </div>
                                                )}
                                                {!product.inStock && (
                                                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                                                        Out of Stock
                                                    </div>
                                                )}
                                                <div className="absolute top-2 right-2 flex space-x-1">
                                                    <button className="bg-white p-1 rounded-full shadow-md hover:text-blue-600">
                                                        <Heart className="h-5 w-5" />
                                                    </button>
                                                    <button className="bg-white p-1 rounded-full shadow-md hover:text-blue-600">
                                                        <Eye className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                                                        <p className="text-sm text-gray-500">{product.category}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center">
                                                            {product.originalPrice && (
                                                                <p className="text-sm text-gray-500 line-through mr-2">
                                                                    ${product.originalPrice.toFixed(2)}
                                                                </p>
                                                            )}
                                                            <p className="text-xl font-bold text-gray-900">
                                                                ${product.price.toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    {renderStars(product.rating)}
                                                    <p className="text-xs text-gray-500 mt-1">{product.reviewCount} reviews</p>
                                                </div>
                                                <p className="mt-3 text-sm text-gray-600 line-clamp-2">{product.description}</p>
                                                <div className="mt-4 flex space-x-2">
                                                    {product.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="mt-6 flex space-x-3">
                                                    <button
                                                        disabled={!product.inStock}
                                                        className={`flex-1 bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                                    </button>
                                                    <button className="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
                                                        <ShoppingCart className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow overflow-hidden">
                                    <ul className="divide-y divide-gray-200">
                                        {paginatedProducts.map((product) => (
                                            <li key={product.id} className="p-6">
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="flex-shrink-0 md:mr-6 mb-4 md:mb-0">
                                                        <div className="h-40 w-40 bg-gray-200 rounded-lg overflow-hidden">
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                                                                <p className="text-sm text-gray-500">{product.category} • {product.subcategory}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="flex items-center">
                                                                    {product.originalPrice && (
                                                                        <p className="text-sm text-gray-500 line-through mr-2">
                                                                            ${product.originalPrice.toFixed(2)}
                                                                        </p>
                                                                    )}
                                                                    <p className="text-xl font-bold text-gray-900">
                                                                        ${product.price.toFixed(2)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2">
                                                            {renderStars(product.rating)}
                                                            <p className="text-xs text-gray-500 mt-1">{product.reviewCount} reviews</p>
                                                        </div>
                                                        <p className="mt-3 text-sm text-gray-600">{product.description}</p>
                                                        <div className="mt-4">
                                                            <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
                                                            <ul className="mt-2 grid grid-cols-2 gap-2">
                                                                {product.features.slice(0, 4).map((feature, index) => (
                                                                    <li key={index} className="flex items-center text-sm text-gray-600">
                                                                        <Check className="h-4 w-4 text-green-500 mr-2" />
                                                                        {feature}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="mt-6 flex space-x-3">
                                                            <button
                                                                disabled={!product.inStock}
                                                                className={`flex-1 bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                            >
                                                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                                            </button>
                                                            <button className="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
                                                                <Heart className="h-5 w-5" />
                                                            </button>
                                                            <button className="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
                                                                <Eye className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-8 bg-white rounded-lg shadow px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                    <div className="flex-1 flex justify-between sm:hidden">
                                        <button
                                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                                                <span className="font-medium">
                                                    {Math.min(currentPage * itemsPerPage, sortedProducts.length)}
                                                </span>{' '}
                                                of <span className="font-medium">{sortedProducts.length}</span> results
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                                <button
                                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                                    disabled={currentPage === 1}
                                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                                >
                                                    <span className="sr-only">Previous</span>
                                                    <ChevronUp className="h-5 w-5 transform -rotate-90" />
                                                </button>
                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                                                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                                    disabled={currentPage === totalPages}
                                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                                >
                                                    <span className="sr-only">Next</span>
                                                    <ChevronUp className="h-5 w-5 transform rotate-90" />
                                                </button>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductsPage;