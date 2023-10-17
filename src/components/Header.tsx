import Link from "next/link";
import React from "react";
import { Menu } from "@headlessui/react";

function Header() {
  return (
    <header className="relative z-10 flex items-center justify-between p-2" style={{ backgroundColor: "#F35252" }}>
      <div className="flex justify-center w-full">
        <Link href="/">
          <img
            src="/logo.png"
            className="h-[50px] md:h-[62px] ml-10"
            alt="Baiki logo"
          />
        </Link>
      </div>

      <div className="hidden md:inline-flex md:space-x-4">
        {/* Add the Search Icon button with no background */}
        <button className="btn-normal-case">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-8 fill-white stroke-primary"
          height="24" 
          viewBox="0 -960 960 960" 
          width="24"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
        </svg>
        </button>
      </div>

      <Menu>
        <div className="hidden md:inline-flex md:space-x-4">
          {/* Profile icon without a background */}
          <Menu.Button>
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-8 fill-white stroke-primary" 
              height="24" 
              viewBox="0 -960 960 960" 
              width="24"
            >
              <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
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
