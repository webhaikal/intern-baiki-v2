import Link from "next/link";
import React from "react";
import { Menu } from "@headlessui/react";

function Header() {
  return (
    <header className="relative z-10 flex w-full items-center justify-between p-2" style={{ backgroundColor: "#F35252" }}>
      <div className="flex justify-center w-full">
        <Link href="/">
          <img
            src="/logo.png"
            className="h-[50px] md:h-[62px]"
            alt="Baiki logo"
          />
        </Link>
      </div>

      <div className="hidden md:inline-flex md:space-x-4">
        {/* Add the Search Icon button with no background */}
        <button className="btn-normal-case">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-search h-6 w-8 fill-white stroke-primary"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
        </button>
      </div>

    <Menu>
      <div className="hidden md:inline-flex md:space-x-4">
        {/* Profile icon without a background */}
        <Menu.Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-user h-6 w-8 fill-white stroke-primary"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="7" r="4" />
            <path d="M6 21v-1a3.5 3.5 0 0 1 3 -3h6a3.5 3.5 0 0 1 3 3v1" />
          </svg>
          </Menu.Button>
          <Menu.Items>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && 'bg-blue-500'}`}
                  href="/account-login"
                >
                  Log Masuk
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
      </div>
    </Menu>

      <div className="drawer drawer-end m-0 w-auto p-0 md:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-menu-2 h-6 w-6 fill-none stroke-primary"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </label>
        </div>
        <div className="drawer-side z-20">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>

          <ul className="menu h-full w-80 gap-2 bg-base-200 p-4 text-base-content">
            <Link
              href="/submit"
              className="btn-primary btn text-xs normal-case"
            >
              Submit Service
            </Link>
            <Link
              href="/profile"
              className="btn-primary btn text-xs normal-case"
            >
              Profile
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
