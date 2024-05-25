"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/app/barebone_logo_transparent_long.png";
import {
  HomeIcon,
  EnvelopeIcon,
  UsersIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

import ButtonAccount from "@/components/ButtonAccount";

export const dynamic = "force-dynamic";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Startups",
    href: "/startups",
    icon: RocketLaunchIcon,
    current: false,
  },
  { name: "Investors", href: "/investors", icon: UsersIcon, current: false },
  { name: "Outreach", href: "/outreach", icon: EnvelopeIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const router = useRouter();

  useEffect(() => {
    setActiveItem(window.location.pathname);
  }, []);

  const handleNavigation = (name, href) => {
    setActiveItem(name);
    router.push(href);
  };

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-950 px-6">
      <div className="flex h-16 mt-5 shrink-0 items-center">
        <Image className="h-8 w-auto" src={logo} alt="Barebone" />
        <div className="items-right"></div>
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.name, item.href);
                    }}
                    className={classNames(
                      item.name === activeItem
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {item.name}
                    {item.count ? (
                      <span
                        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
                        aria-hidden="true"
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <div className="mt-20 py-4">
            <ButtonAccount />
          </div>
        </ul>
      </nav>
    </div>
  );
}
