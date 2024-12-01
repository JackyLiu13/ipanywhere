import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/frontend/components/ui/navigation-menu";
import { SearchBarWithAutocomplete } from "@/frontend/components/ui/search-bar";
import { Separator } from "@/frontend/components/ui/separator";
import { MessageCircle, ChartCandlestick, HandCoins, User } from "lucide-react";
import { categories } from "@/frontend/constants/categories";
import { DropdownMenuDemo } from "./navbar-dropdown";
import Logo from "@/frontend/assets/Logo";

const NavbarNoLogin = ({ onConnect }: { onConnect: () => void }) => {

    return (
        <div className=" my-2 z-50 ">
            <div className="w-full flex items-center">
                <a href='/' className="w-1/2 h-full flex items-center ml-16 mt-4"><Logo /></a>

                <div className="w-full h-full flex flex-row justify-end border-red-300 border- pr-32">
                    <div className="flex items-center space-x-4 p-4 ">
                        <a href='https://braavos.app' className={`flex items-center relative p-3 px-6 rounded-full border-2 border-gray-600`} >
                            Sign Up
                        </a>
                        <a onClick={onConnect} className={`flex items-center relative p-3 px-6 rounded-full bg-[#c8daff]`} >
                            Log In
                            <div className="absolute right-0 -top-1 text-xs  rounded-full px-1"></div>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NavbarNoLogin;

