'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const session = useSession()
  return (
    <div className="flex justify-between m-2 p-3">
      <div>
        Blog
      </div>
      <div>
        {session.data?.user && <button onClick={()=> signOut()}>Sign out</button>}
        {!session.data?.user && <button onClick={()=> signIn()}>Sign in</button>}
      </div>
    </div>
  );
}
