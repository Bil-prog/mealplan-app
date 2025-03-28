"use client";

import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return <p>Loading...</p>;
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <Image className="text-xl font-bold text-indigo-700 cursor-pointer" src="/logo.png" alt="logo" width={70} height={70} />
        </Link>
        <div className="space-x-6 flex items-center">
          <SignedIn>
            <Link href="/mealplan" className="border-2 border-indigo-500 text-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-500 hover:text-white transition-colors">Meal plan</Link>
            {user?.imageUrl ? (
              <Link href="profile">
                <Image
                  src={user.imageUrl}
                  alt="profile picture"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            )}
          </SignedIn>
          <SignedOut>
            <Link href={isSignedIn ? "/mealplan" : "/sign-up"} className="border-2 border-indigo-500 text-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-500 hover:text-white transition-colors">Meal Plan</Link>
            <Link href="/sign-up" className="ml-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors cursor-pointer">Sign Up</Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
