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
import { categories} from "@/frontend/constants/categories";
import {DropdownMenuDemo} from "./navbar-dropdown";
import Logo from "@/frontend/assets/Logo";

const Navbar = ({ disconnect }: { disconnect: () => void }) => {
  const location = useLocation();
  const [isBuyer, setIsBuyer] = useState<string>("buy");

  useEffect(() => {
    if (location.pathname === '/buy') {
      setIsBuyer("buy");
    } else if (location.pathname === '/sell') {
      setIsBuyer("sell");
    } else {
      setIsBuyer("buy"); // Default case
    }
  }, [location.pathname]); // Dependency array to re-run effect on pathname change

  return (
    <div className="h-full my-2 z-50 relative">
      <div className="h-1/2  grid grid-cols-3 gap-4 items-center">
        <a href='/' className="w-full h-full flex items-center ml-16 mt-4"><Logo/></a>

        <div className="w-full border- border-purple-300">
          <SearchBarWithAutocomplete />
        </div>

        <div className="w-full h-full flex flex-row justify-end border-red-300 border- pr-16">
          <div className="flex items-center space-x-4 p-4 ">
            <a href='/sell' className={`flex items-center relative p-3 px-6 rounded-full ${isBuyer == "buy" ? "border-2 border-gray-600" : "bg-[#c8daff]"}`} >
              Sell
            </a>
            <a href='/marketplace' className={`flex items-center relative p-3 px-6 rounded-full ${isBuyer == "sell" ? "border-2 border-gray-600" : "bg-[#c8daff]"}`} >
              Buy
              <div className="absolute right-0 -top-1 text-xs  rounded-full px-1"></div>
            </a>
            <a href='/marketplace' className="flex items-center relative">
              <DropdownMenuDemo disconnect={disconnect}>
                <User className="w-8 h-8 mr-10" />
              </DropdownMenuDemo>

            </a>
          </div>
        </div>
      </div>

      <div className="h-1/2 grid grid-cols-3 gap-4 items-center py-3">
        <div></div>

        <div className="border-red-300 mx-3 flex flex-row gap-2 items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium px-4 py-2 rounded-lg bg-transparent ">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[64rem]">
                  <div className="grid grid-cols-3 gap-4 p-4">
                    {categories.map((category, index) => (
                      <a href={`#${category.title}`} key={index} className="flex flex-col border-b pb-2">
                        <span className="font-semibold">{category.title}</span>
                        {category.items.map((item, idx) => (
                          <a href={`/marketplace#${item.name}`} key={idx} className="flex flex-col mb-1">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-gray-500">{item.description}</span>
                          </a>
                        ))}
                      </a>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Separator orientation="vertical" className="bg-gray-300 h-8 mx-2" />
          <a
            href="/marketplace"
            className="text-sm font-medium px-4 py-2 rounded-lg"
          >
            Marketplace
          </a>
        </div>
        <div />
      </div>
    </div>
  );
};

export default Navbar;
