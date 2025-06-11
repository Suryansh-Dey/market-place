import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link"
import { ModeToggle } from "./ModeToggle"

export default function Navbar() {
    return (
        <Menubar>
            <MenubarMenu>
                <Link href="/register/intro">
                    <MenubarTrigger>Register</MenubarTrigger>
                </Link>
                <Link href="/market">
                    <MenubarTrigger>Market</MenubarTrigger>
                </Link>
            </MenubarMenu>
            <ModeToggle />
        </Menubar>
    )
}

