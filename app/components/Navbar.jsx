"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { UserAuth } from "../context/AuthContext";
import { addUserToFirestore } from "../firebase";
import { BsPersonCircle } from 'react-icons/bs';
import Image from 'next/image';


const Navbar = () => {
  const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        left: false,
    });

  const { user, googleSignIn, logOut } = UserAuth();

  const formatDisplayName = (displayName) => {
    return displayName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleSignIn = async () => {
    console.log("Signing in...");
    try {
      console.log("Si...");
      await googleSignIn();
      console.log("User signed in successfully.");
      addUserToFirestore(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenNavbar = () => {
    setOpen(prev => !prev);
}

  const handleSignOut = async () => {
    try {
      await logOut();
      console.log("User signed out successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-nav-lab shadow">
      <div className="flex mb-2 sm:mb-0 space-x-2 ml-20">
        <img src="./org-logo.png"  width={35} height={35} alt="Logo" />
        <Link href="/" passHref>
          <span className="text-2xl no-underline text-dlab-blue">Datalab AI</span>
        </Link>
      </div>

      <div className="self-center">
        {user ? (
          <div className="flex items-center">
            <span className="text-md no-underline text-dlab-blue ml-2 px-1">
            Welcome, {formatDisplayName(user.displayName)}   
            </span>
            
            <BsPersonCircle onClick={handleOpenNavbar} className='cursor-pointer text-dlab-blue m-0 w-8 h-8' />
            {
                        open && <div className='absolute top-5 border rounded bg-nav-lab ml-32 mt-6 justify-items-end	text-right'>
                            <div className='flex flex-col space '>
                               <button onClick={handleSignOut} className="text-md no-underline ml-2 px-4 py-2 text-dlab-blue focus:outline-none">
                                  View Profile
                                </button>
                                <button onClick={handleSignOut} className="text-md no-underline ml-2 px-4 py-2 text-dlab-blue focus:outline-none">
                                  Logout
                                </button>
                            </div>
                        </div>
                    }
          </div>
        ) : (
          <button onClick={handleSignIn} className="text-md no-underline ml-2 px-4 py-2  text-dlab-blue focus:outline-none">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
