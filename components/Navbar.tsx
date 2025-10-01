import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/common/menubar";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { auth } from "@/auth";
import AuthButtons from "@/components/auth/AuthButtons";

type SessionUserLocal = { role?: string; name?: string };

export default async function Navbar() {
  const session = await auth();
  const user = session?.user as SessionUserLocal | undefined;
  const role = user?.role;

  return (
    <Menubar>
      <MenubarMenu>
        <Link href="/trips">
          <MenubarTrigger>Trips</MenubarTrigger>
        </Link>
        {role === "vendor" && (
          <Link href="/vendor/dashboard">
            <MenubarTrigger>Vendor</MenubarTrigger>
          </Link>
        )}
        {role === "admin" && (
          <Link href="/admin">
            <MenubarTrigger>Admin</MenubarTrigger>
          </Link>
        )}
      </MenubarMenu>
      <div className="flex items-center gap-2 ml-auto pr-2">
        <AuthButtons name={user?.name} />
        <ModeToggle />
      </div>
    </Menubar>
  );
}
