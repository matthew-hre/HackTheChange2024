'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, User, LogOut } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg bg-[#550000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-white">
                Logo
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-primary text-white" >Home</Link>
                <Link href="/landing/AboutUs" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-primary text-white">About Us</Link>
                <Link href="/landing/topics" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-primary text-white">Topics</Link>
                <Link href="/landing/events" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-primary text-white">Events</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link href="/landing/profile" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-primary text-white">
                <User className="inline-block w-5 h-5 mr-1" />
                Profile
              </Link>
              <Link href="/landing/signout" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-primary text-white">
                <LogOut className="inline-block w-5 h-5 mr-1 text-white" />
                Sign Out
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-primary-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground hover:text-primary">Home</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground hover:text-primary">About Us</Link>
            <Link href="/topics" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground hover:text-primary">Topics</Link>
            <Link href="/events" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground hover:text-primary">Events</Link>
            <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground hover:text-primary">Profile</Link>
            <Link href="/signout" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground hover:text-primary">Sign Out</Link>
          </div>
        </div>
      )}
    </nav>
  )
}