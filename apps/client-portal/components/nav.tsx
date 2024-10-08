import Image from "next/image";
import { Button } from "@repo/ui/components/ui/button";
import * as Text from "@repo/ui/components/ui/text";
import { cn } from "@repo/ui/lib/utils";
import React, { useState } from "react";
import {
  FileUp,
  HandCoins,
  Headset,
  Home,
  LogOut,
  Menu,
  Plus,
  Receipt,
  Star,
  User,
  X,
} from "lucide-react";

import { Url } from "next/dist/shared/lib/router/router";

import { IconButton } from "@repo/ui/components/ui/icon-button";
import { navIconSize, SideNavItemSimple } from "@repo/ui/components/ui/sidenav";
import { RequestEstimateDialog } from "./request-estimate";

/**
 *
 * Nav data
 * -
 * Mock the data for us to use
 * Eventually this should come from the pages/router info
 *
 */
const navArray = [
  {
    title: "Home",
    type: "flat",
    icon: <Home size={navIconSize} />,
    href: "/",
  },
  {
    title: "Estimates",
    type: "flat",
    icon: <HandCoins size={navIconSize} />,
    href: "/estimates",
  },
  {
    title: "Invoices",
    type: "flat",
    icon: <Receipt size={navIconSize} />,
    href: "/invoices",
  },
  {
    title: "Uploads",
    type: "flat",
    icon: <FileUp size={navIconSize} />,
    href: "/uploads",
  },
  {
    type: "break",
  },
  {
    title: "Rate Us",
    type: "flat",
    icon: <Star size={navIconSize} />,
    href: "/rate-us",
  },
  {
    title: "Contact Us",
    type: "flat",
    icon: <Headset size={navIconSize} />,
    href: "/contact-us",
  },
  {
    type: "break",
  },
  {
    title: "My Profile",
    type: "flat",
    icon: <User size={navIconSize} />,
    href: "/my-profile",
  },
  {
    title: "Log Out",
    type: "flat",
    icon: <LogOut size={navIconSize} />,
    href: "/",
  },
];

/**
 *
 * Styles
 * --
 * Extracted after the fact
 */
const _bg = `bg-background`; // TODO: semantic this
// Root
const navWidth = `240px`;
const _mobile = `flex flex-col w-full `;
const _tablet = `md:w-[240px] md:flex-shrink-0 border-gray-300 md:border-r`; // TODO: extract nav width
// Brand
const _brandBase = `pt-6 px-4 pb-4 flex flex-row justify-between h-[68px] z-10`;
const _brandTablet = `md:flex-col md:text-center md:gap-6 md:h-auto`;
// Body
const _bodyCurrent = `p-4 flex flex-col gap-8 flex-1`;
const _bodyMobile = `pt-[calc(68px+16px)] absolute top-0 w-full h-full justify-between sm:h-auto`;
const _bodyTablet = `md:relative md:translate-y-0 md:p-4`;
// const _bodyTransform = `${open ? "translate-y-0" : "translate-y-[-100%]"} transition-all ease-in-out duration-500`;
// Footer
const _footer = `flex flex-col gap-1 items-center sm:text-left sm:items-start sm:pl-3`;

/**
 *
 * Sidenav
 * -
 * The entire sidenav feature
 * Might just call this the NAV?
 * Since, there isn't another nav
 *
 */
export const Nav = ({ ...props }) => {
  //
  const [open, setOpen] = useState(true);

  function toggleOpen() {
    setOpen((cv) => !cv);
  }

  function handleSubmit(args: any) {
    console.log("submit", args);
  }

  // Styles that require state
  const _bodyTransform = `${
    open ? "translate-y-0" : "translate-y-[-100%]"
  } transition-all ease-in-out duration-500`;

  return (
    <aside className={cn(_mobile, _tablet, "color-debug", _bg)}>
      {/* Branding */}
      <div className={cn(_brandBase, _brandTablet, _bg)}>
        <Image
          alt="Logo"
          src="/logo.png"
          width={208}
          height={90}
          className="w-full hidden md:block"
        />
        <Text.Heading>Madison Handyman</Text.Heading>
        <div className="flex-shrink-0 md:hidden">
          <IconButton onClick={toggleOpen}>
            {open ? <X size={16} /> : <Menu size={16} />}
          </IconButton>
        </div>
      </div>

      {/* Body */}
      <div
        className={cn(
          _bodyCurrent,
          _bodyMobile,
          _bodyTransform,
          _bodyTablet,
          _bg,
        )}
      >
        {/* Top */}
        <div className={cn("flex flex-col gap-8")}>
          <RequestEstimateDialog
            userId="00124"
            onSubmit={handleSubmit}
            trigger={
              <Button variant="outline">
                <Plus />
                Request an estimate
              </Button>
            }
          />
          {/* Nav items */}
          <div className={cn("flex flex-col gap-3")}>
            {navArray.map((item, i) => {
              if (item.type === "break") {
                // TODO: add seperator component
                return <div className="h-[1px] w-full bg-gray-300" key={i} />;
              } else {
                return (
                  <SideNavItemSimple
                    key={i}
                    isActive={false}
                    icon={item.icon}
                    href={item.href as Url}
                  >
                    {item.title}
                  </SideNavItemSimple>
                );
              }
            })}
          </div>
        </div>
        {/* footer */}
        <div className={_footer}>
          <Text.Body size={"sm"}>Driven by</Text.Body>
          <Image
            alt="Logo"
            src="/copilot-footer-logo.png"
            width={81}
            height={24}
            className="max-w-full"
          />
        </div>
      </div>
    </aside>
  );
};
