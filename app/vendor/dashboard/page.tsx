import { auth } from "@/auth";
import { updateUser } from "@/lib/db-helpers";
import { redirect } from "next/navigation";
import VendorDashboard from "@/components/vendor/VendorDashboard";

export default async function VendorDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();
  const params = await searchParams;

  // If not authenticated, bounce to sign-in
  if (!session?.user?.id) {
    redirect("/auth/signin?vendor=1");
  }

  // Check if this is a vendor sign-up completion
  const isVendorSignup = params?.vendor === "1";
  
  if (isVendorSignup && (session.user as any).role !== "vendor") {
    // Update user role to vendor
    await updateUser(session.user.id as string, { role: "vendor" as any });
    console.log("Updated user to vendor role:", session.user.email);
  }

  return (
    <VendorDashboard 
      user={{
        id: session.user.id as string,
        name: session.user.name || "",
        email: session.user.email || "",
        role: (session.user as any).role || "user",
        vendorVerified: (session.user as any).vendorVerified || false,
      }}
    />
  );
}