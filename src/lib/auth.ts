import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { getOrCreateProfile } from '@/lib/db'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user }) {
      try {
        if (user.email) {
          await getOrCreateProfile(user.email, user.name ?? '', user.image ?? '')
        }
      } catch (error) {
        console.error('Profile creation error:', error)
      }
      return true
    },
    async session({ session }) {
      return session
    },
  },
}
