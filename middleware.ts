import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const path = req.nextUrl.pathname;
      
      if (path.startsWith("/teacher")) {
        return token?.role === "TEACHER";
      }
      
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/challenges/:path*",
    "/sandbox/:path*",
    "/teacher/:path*",
  ],
};