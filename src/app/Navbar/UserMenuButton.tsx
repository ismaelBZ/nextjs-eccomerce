"use client"

import { Session } from "next-auth"
import Image from "next/image";
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png"
import { signIn, signOut } from "next-auth/react";

interface UserMenuButtonProps {
  session: Session | null
}

export default function UserMenuButton ( {session}: UserMenuButtonProps ) {

  const user = session?.user;
  
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        { user ? 
          <Image 
            src={user?.image || profilePicPlaceholder} 
            alt="Profile picture"
            width={40}
            height={40}
            className="w-10 rounded-full" 
          />
        : 
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            fill="#c4c4c4" 
            viewBox="0 0 45.53 45.53" 
            stroke="bbb"
            strokeWidth="0.5"
          >
              {/* <g id="SVGRepo_bgCarrier" stroke-width="0">
              </g>
              <g id="SVGRepo_tracerCarrier" 
                  
                stroke="#ffffff" 
                stroke-width="1.001704">
              </g> */}
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round"
              d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765 S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53 c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012 c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592 c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"
            /> 
          </svg>
        }
      </label>
      <ul 
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow" 
      >
        <li>
          {user ? 
            <button onClick={() => signOut({callbackUrl: "/"})}>
              Sign Out
            </button>
          : 
            <button onClick={() => signIn()}>
              Sign In
            </button>
          }
        </li>
      </ul>
    </div>
)
}