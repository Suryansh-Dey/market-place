import Plan from "./Plan"
import type { PlanData } from "./Plan"

// Fetch plans from DynamoDB via API route
async function getPlans(agencyId: string = "default-agency"): Promise<PlanData[]> {
    try {
        // Fetch from our API route that connects to DynamoDB
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/plans?agencyId=${agencyId}`, {
            cache: 'no-store' // Ensure fresh data
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch plans: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Data from DynamoDB already matches our PlanData interface
        return data.plans as PlanData[];
    } catch (error) {
        console.error("Error fetching plans from DynamoDB:", error);
        
        // Return fallback data if API fails (with all required fields)
        return [
            {
                planId: "fallback-001",
                agencyId: agencyId,
                name: "Sample Plan (DB Connection Required)",
                route: ["Start", "Destination"],
                price: 0,
                image: "https://via.placeholder.com/400x300?text=Configure+DynamoDB",
                description: "Unable to connect to DynamoDB. Please configure your AWS credentials in .env.local file.",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isActive: true
            }
        ];
    }
}

export default async function Plans() {
    // You can change the agencyId based on the logged-in agency
    const agencyId = "default-agency";
    const plans = await getPlans(agencyId);
    
    // Filter to show only active plans
    const activePlans = plans.filter(plan => plan.isActive);
    
    const planComponents = activePlans.map((plan) => 
        <Plan key={plan.planId} plan={plan} editable={true} />
    );
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Travel Plans Dashboard
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-0">
                        Manage your travel experiences
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                        <p>Agency: <span className="font-medium">{agencyId}</span></p>
                        <p>Active Plans: <span className="font-medium text-green-600 dark:text-green-400">{activePlans.length}</span></p>
                    </div>
                </div>
            </div>
            
            {activePlans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {planComponents}
                </div>
            ) : (
                <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <div className="max-w-md mx-auto">
                        <div className="text-4xl mb-4">✈️</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No active plans available
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-2">
                            {plans.length > 0 
                                ? `You have ${plans.length} inactive plan${plans.length === 1 ? '' : 's'} hidden`
                                : "Create your first travel plan or check your database connection"}
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                            Get started by adding some amazing travel experiences!
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

