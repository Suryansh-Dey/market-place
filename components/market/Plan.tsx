'use client'
import React, { useState } from "react"
import Image from "next/image"
import { Button } from "../ui/button"
import { Edit3, MapPin, Calendar, Building, Activity } from "lucide-react"

// Updated PlanData interface to match DynamoDB schema
export type PlanData = {
    planId: string,
    agencyId: string,
    name: string,
    image: string,
    route: string[],
    description: string,
    price: number,
    createdAt: string,
    updatedAt: string,
    isActive: boolean
}

export default function Plan({ plan, editable }: { plan: PlanData, editable?: boolean }) {
    const [editing, setEditable] = useState(false)
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 max-w-md">
            {
                editing ?
                    <PlanEdit plan={plan} toggle={() => setEditable(false)} />
                    : <PlanDisplay plan={plan} toggle={editable ? () => setEditable(true) : undefined} />
            }
        </div>
    )
}
function PlanDisplay({ plan, toggle }: { plan: PlanData, toggle?: () => void }) {
    const createdDate = new Date(plan.createdAt).toLocaleDateString()
    const updatedDate = new Date(plan.updatedAt).toLocaleDateString()
    
    return (
        <div className="relative">
            {/* Edit Button */}
            {toggle && (
                <Button 
                    onClick={toggle} 
                    size="sm"
                    variant="outline"
                    className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
                >
                    <Edit3 className="w-4 h-4 mr-1" />
                    Edit
                </Button>
            )}
            
            {/* Hero Image */}
            <div className="relative h-48 overflow-hidden">
                <Image 
                    src={plan.image} 
                    alt={plan.description} 
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Content */}
            <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                            {plan.name}
                        </h2>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            plan.isActive 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                            <Activity className="w-3 h-3 inline mr-1" />
                            {plan.isActive ? "Active" : "Inactive"}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                        ID: {plan.planId.substring(0, 12)}...
                    </p>
                </div>
                
                {/* Route */}
                <div className="mb-4">
                    <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                        Route
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                            {plan.route[0]} → {plan.route[plan.route.length - 1]}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            {plan.route.join(" → ")}
                        </p>
                    </div>
                </div>
                
                {/* Description */}
                <div className="mb-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {plan.description}
                    </p>
                </div>
                
                {/* Price */}
                <div className="mb-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ₹{plan.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-blue-500 dark:text-blue-400">Starting price</p>
                    </div>
                </div>
                
                {/* Metadata */}
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                            <Building className="w-3 h-3 mr-1" />
                            <span className="truncate">Agency: {plan.agencyId}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>Created: {createdDate}</span>
                        </div>
                        <div className="flex items-center col-span-2">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>Updated: {updatedDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
function PlanEdit({ plan, toggle }: { plan: PlanData, toggle: () => void }) {
    const [formData, setFormData] = useState({
        name: plan.name,
        description: plan.description,
        price: plan.price,
        startRoute: plan.route[0],
        endRoute: plan.route[plan.route.length - 1],
        image: plan.image
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Update the plan object
        plan.name = formData.name
        plan.description = formData.description
        plan.price = formData.price
        plan.route[0] = formData.startRoute
        plan.route[plan.route.length - 1] = formData.endRoute
        plan.image = formData.image
        toggle()
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Edit Plan
                </h3>
                <Button 
                    onClick={toggle} 
                    variant="outline" 
                    size="sm"
                    className="bg-gray-100 dark:bg-gray-700"
                >
                    Cancel
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Preview */}
                <div className="relative h-32 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                    <Image 
                        src={formData.image} 
                        alt="Plan preview" 
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Plan Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Plan Name
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter plan name"
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Image URL
                    </label>
                    <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                {/* Route */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <MapPin className="w-4 h-4 inline mr-1" />
                            From
                        </label>
                        <input
                            type="text"
                            value={formData.startRoute}
                            onChange={(e) => setFormData({...formData, startRoute: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Starting point"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <MapPin className="w-4 h-4 inline mr-1" />
                            To
                        </label>
                        <input
                            type="text"
                            value={formData.endRoute}
                            onChange={(e) => setFormData({...formData, endRoute: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Destination"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        placeholder="Plan description..."
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price (₹)
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">₹</span>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="0"
                            min="0"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <Button 
                        type="submit" 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Save Changes
                    </Button>
                    <Button 
                        type="button"
                        onClick={toggle} 
                        variant="outline" 
                        className="bg-gray-100 dark:bg-gray-700"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}

