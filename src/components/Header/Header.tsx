import {
  DocumentIcon,
  EyeSlashIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

function ProfilePicture() {
  const { user, logout } = useAuth();

  const handleLogOut = async () => {
    try {
      await logout();
    } catch {}
  };

  return (
    <div>
      <Menu>
        <MenuButton
          className={`flex justify-center items-center  bg-white text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white ${
            !user ? "rounded" : "rounded-full"
          }`}
        >
          {user && user.photoURL && (
            <div className="w-12 aspect-square m-auto">
              <Image
                src={user.photoURL}
                width="48"
                height="48"
                alt="Imge"
                className="rounded-full"
              />
            </div>
          )}
          {!user && (
            <Link href="/login" className="text-gray-700 px-4 py-3">
              Login
            </Link>
          )}
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 mt-4 origin-top-right rounded-xl border border-gray-200 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200">
              <DocumentIcon className="size-4 fill-black" />
              Terms & Condition
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200">
              <EyeSlashIcon className="size-4 fill-black" />
              Privacy Policy
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={handleLogOut}
              className="group text-red-600 flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-red-200"
            >
              <LogOut className="size-4 fill-black" />
              Log Out
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}

export default function Header() {
  return (
    <header className="container mx-auto justify-end flex items-center px-4 md:px-8 py-2 sticky top-0 isolate z-50 bg-[#f2f2f2] border-b border-gray-200">
      <ProfilePicture />
    </header>
  );
}
