import React from 'react';

import {
    Cloud,
    CreditCard,
    Upload,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
    FileCode,
} from "lucide-react"

import { Button } from "@/frontend/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/frontend/components/ui/dropdown-menu"

export function DropdownMenuDemo({ disconnect, children }: { disconnect: () => void, children: React.ReactNode }) {
    return (
        <div className='overflow-hidden'> <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <a href='/profile'>
                        <DropdownMenuItem>
                            <User />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </a>
                    <a href='/profile/patents'>
                        <DropdownMenuItem>
                            <Upload />
                            <span>Patents</span>
                        </DropdownMenuItem>
                    </a>
                    <a href='/profile/orders'>
                        <DropdownMenuItem>
                            <CreditCard />
                            <span>Orders</span>
                        </DropdownMenuItem>
                    </a>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <a onClick={disconnect} href='/'>
                    <DropdownMenuItem>
                        <LogOut />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </a>
            </DropdownMenuContent>
        </DropdownMenu></div>

    )
}
