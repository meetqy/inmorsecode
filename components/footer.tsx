"use client";

import React from "react";
import { Link, Spacer } from "@heroui/react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="flex w-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="flex items-center justify-center">
          <span className="font-medium italic font-serif text-primary text-xl">
            InMorseCode
          </span>
        </div>
        <Spacer y={4} />
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.label}
              isExternal
              className="text-default-500"
              href={item.href}
              size="sm"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Spacer y={4} />
        <p className="mt-1 text-center text-small text-default-400">
          &copy; 2024 InMorseCode Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
