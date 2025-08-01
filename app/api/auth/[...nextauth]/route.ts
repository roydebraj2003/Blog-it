import { prismaClient } from "@/app/lib/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import type { NextAuthOptions, Session, SessionStrategy, User } from "next-auth";
import { JWT } from 'next-auth/jwt';
import GoogleProvider from "next-auth/providers/google"
type JWTCallbacksParams = {
    token: JWT,
    user: User
}
type SessionCallbacksParams = {
    session: Session,
    token: JWT
}
export const authOptions = {
    adapter: PrismaAdapter(prismaClient),
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID ?? "",
                clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
              })
        ],
        session: {
            strategy: "jwt" as SessionStrategy,
          },
        callbacks: {
            async jwt({token, user} : JWTCallbacksParams) {
                
                if(user) {
                    token.id = user.id
                }
                console.log("user : ", user)
                console.log("token : ", token)
                return token
            },
            async session({ session, token } : SessionCallbacksParams) {
                console.log(session)
                if(token && session.user) {
                    session.user.id = token.id as string
                }
                return session;
            }
            
        }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }