'use client'
import { useState } from "react"
import { Button } from "../ui/button"

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
        <div className="plan">
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
        <>
            {toggle ? <Button onClick={toggle}>Edit</Button> : null}
            <div className="plan-header">
                <h1>{plan.name}</h1>
                <span className="text-xs text-gray-500">ID: {plan.planId.substring(0, 8)}...</span>
            </div>
            <img src={plan.image} alt={plan.description} />
            <p><strong>From {plan.route[0]} to {plan.route[plan.route.length - 1]}</strong></p>
            <p className="route-details">Route: {plan.route.join(" → ")}</p>
            <p>{plan.description}</p>
            <p className="price">at ₹{plan.price}</p>
            <div className="plan-metadata text-xs text-gray-500">
                <p>Agency: {plan.agencyId}</p>
                <p>Created: {createdDate}</p>
                <p>Updated: {updatedDate}</p>
                <p>Status: {plan.isActive ? "Active" : "Inactive"}</p>
            </div>
        </>
    )
}
function PlanEdit({ plan, toggle }: { plan: PlanData, toggle: () => void }) {
    return (
        <>
            <Button onClick={toggle}>View</Button>
            <h1>{plan.name}</h1>
            <img src={plan.image} alt={plan.description} />
            <div>
                From <input onChange={(event) => { plan.route[0] = event.target.value }} placeholder={plan.route[0]} />
                to <input onChange={(event) => { plan.route[plan.route.length - 1] = event.target.value }} placeholder={plan.route[plan.route.length - 1]} />
            </div>
            <div>
                <input onChange={(event) => { plan.description = event.target.value }} placeholder={plan.description} />
            </div>
            <div>
                at ₹<input type="number" onChange={(event) => { plan.price = parseInt(event.target.value) }} placeholder={`${plan.price}`} />
            </div>
        </>
    )
}

