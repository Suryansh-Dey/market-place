import "./Plans.css"
import Plan from "./Plan"
import type { PlanData } from "./Plan"

let plans: PlanData[] | null = null
async function getPlans(orgId: string): Promise<PlanData[]> {
    if (plans) return plans
    const response = await fetch("https://train.vinaiak.com/login/")
    const data = await response.text()
    plans = [
        {
            name: "Bhrast planner",
            route: ["swarg", "patal", "nark"],
            price: 70000000,
            image: "https://staticimg.amarujala.com/assets/images/2016/11/22/nark_1479815907.jpeg",
            description: "Paise lao fir description padhna. " + data[0] + orgId
        },
        {
            name: "Roller coster",
            route: ["niche", "bichme", "uppar"],
            price: 7,
            image: "https://t4.ftcdn.net/jpg/03/20/00/21/240_F_320002102_Mtgit9EEEutS4yq3A7kl2pGb4VKO6IQI.jpg",
            description: "Spelling nhi aata.. description itna hi hai"
        }
    ]
    return plans
}
export default async function Plans() {
    const response = await getPlans('1')
    const plans = response.map((plan, i) => <Plan key={i} plan={plan} editable={true} />)
    return (
        <div className="plans">
            {plans}
        </div>
    )
}

