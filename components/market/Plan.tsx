'use client'
import { useState } from "react"
import { Button } from "../ui/button"

export type PlanData = {
    name: string,
    image: string,
    route: string[],
    description: string,
    price: number
}

export default function Plan({ plan, editable }: { plan: PlanData, editable?: boolean }) {
    const [editing, setEditable] = useState(false)
    return (
        <div className="plan">
            {
                editing ?
                    <PlanEdit plan={plan} toggle={() => setEditable(false)} />
                    : <PlanData plan={plan} toggle={editable ? () => setEditable(true) : undefined} />
            }
        </div>
    )
}
function PlanData({ plan, toggle }: { plan: PlanData, toggle?: () => void }) {
    return (
        <>
            {toggle ? <Button onClick={toggle}>Edit</Button> : null}
            <h1>{plan.name}</h1>
            <img src={plan.image} alt={plan.description} />
            <p><strong>From {plan.route[0]} to {plan.route[plan.route.length - 1]}</strong></p>
            <p>{plan.description}</p>
            <p>at ₹{plan.price}</p>
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

