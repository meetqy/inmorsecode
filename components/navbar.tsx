"use client";

import type { NavbarProps } from "@heroui/react";

import React from "react";
import {
  Navbar as NavbarComponent,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import { siteConfig } from "@/config/site";

export function Navbar(props: NavbarProps) {
  return (
    <NavbarComponent
      {...props}
      classNames={{
        base: "py-4 backdrop-filter-none bg-transparent",
        wrapper: "px-0 w-full justify-center bg-transparent",
      }}
      height="54px"
      id="navbar"
    >
      <NavbarContent
        className="gap-4 rounded-full border-small border-default-200/20 bg-background/60 px-2 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
        justify="center"
      >
        {/* Logo */}
        <NavbarBrand className="mr-2 w-[40vw] md:w-auto md:max-w-fit">
          <Link
            href="/"
            className="ml-2 font-bold text-xl font-serif italic text-primary"
          >
            InMorseCode
          </Link>
        </NavbarBrand>

        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link className="text-default-500" href={item.href} size="sm">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem className="mr-2" />
      </NavbarContent>
    </NavbarComponent>
  );
}
