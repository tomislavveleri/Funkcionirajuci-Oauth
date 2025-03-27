import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Strava from "next-auth/providers/strava";

export const { auth, handlers, signIn } = NextAuth({
  providers: [GitHub, Strava],
});
