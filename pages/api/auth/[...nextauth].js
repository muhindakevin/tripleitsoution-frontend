import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🚀 Starting authorization process");
        
        if (!credentials?.email || !credentials?.password) {
          console.error("❌ Missing credentials");
          throw new Error("Missing email or password");
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(credentials.email)) {
          console.error("❌ Invalid email format");
          throw new Error("Invalid email format");
        }

        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/account/login`;
          console.log("🔗 API URL:", apiUrl);

          // Validate API URL
          if (!process.env.NEXT_PUBLIC_API_URL) {
            throw new Error("API URL not configured");
          }

          const requestData = {
            email: credentials.email.trim().toLowerCase(),
            password: credentials.password,
          };
          console.log("📤 Request data:", { email: requestData.email, password: "[HIDDEN]" });

          const response = await axios.post(apiUrl, requestData, {
            timeout: 15000, // Increased timeout
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            validateStatus: function (status) {
              // Don't throw for any status code, we'll handle it manually
              return status < 500;
            }
          });

          console.log("📥 Response status:", response.status);
          console.log("📥 Response data structure:", Object.keys(response.data || {}));

          // Handle different response statuses
          if (response.status === 400) {
            console.error("❌ Bad Request - API returned 400");
            const errorMessage = response.data?.message || response.data?.error || "Invalid request format";
            throw new Error(`Bad Request: ${errorMessage}`);
          }

          if (response.status === 401) {
            console.error("❌ Unauthorized - Invalid credentials");
            throw new Error("Invalid email or password");
          }

          if (response.status === 404) {
            console.error("❌ API endpoint not found");
            throw new Error("Authentication service not available");
          }

          if (!response.data) {
            console.error("❌ No response data from API");
            throw new Error("No response data from API");
          }

          if (response.status !== 200) {
            console.error("❌ Unexpected response status:", response.status);
            throw new Error(`Unexpected response: ${response.status}`);
          }

          let user, token, refresh;

          // Handle different API response structures
          if (response.data.access && response.data.user) {
            console.log("✅ Using structure: { access, user }");
            user = response.data.user;
            token = response.data.access;
            refresh = response.data.refresh;

          } else if (response.data.token && response.data.user) {
            console.log("✅ Using structure: { token, user }");
            user = response.data.user;
            token = response.data.token;
            refresh = response.data.refreshToken || null;

          } else if (response.data.message && response.data.token) {
            console.log("✅ Using structure: { message, token }");
            token = response.data.token;
            refresh = null;

            try {
              // Decode JWT to extract user info
              const tokenParts = token.split('.');
              if (tokenParts.length !== 3) {
                throw new Error("Invalid JWT format");
              }
              
              const tokenPayload = JSON.parse(atob(tokenParts[1]));
              console.log("🔍 JWT Payload keys:", Object.keys(tokenPayload));

              user = {
                id: tokenPayload.sub || tokenPayload.id || credentials.email,
                email: tokenPayload.email || tokenPayload.sub || credentials.email,
                role: tokenPayload.role || 'USER',
                username: tokenPayload.username || tokenPayload.name || credentials.email.split('@')[0]
              };
            } catch (jwtError) {
              console.error("❌ JWT parsing error:", jwtError.message);
              // Fallback user object
              user = {
                id: credentials.email,
                email: credentials.email,
                role: 'USER',
                username: credentials.email.split('@')[0]
              };
            }

          } else if (response.data.id && response.data.email) {
            console.log("✅ Using structure: direct user object");
            user = response.data;
            token = response.data.token || "dummy-token";
            refresh = response.data.refreshToken || null;

          } else if (response.data.success && response.data.user) {
            console.log("✅ Using structure: { success, user }");
            user = response.data.user;
            token = response.data.user.token || response.data.token;
            refresh = response.data.user.refreshToken || response.data.refresh || null;

          } else if (response.data.success && response.data.data) {
            console.log("✅ Using structure: { success, data }");
            user = response.data.data.user || response.data.data;
            token = response.data.data.token || response.data.data.access;
            refresh = response.data.data.refresh || response.data.data.refreshToken;

          } else {
            console.error("❌ Unrecognized API response structure");
            console.error("Response data:", JSON.stringify(response.data, null, 2));
            throw new Error("Invalid response structure from API");
          }

          if (!user) {
            console.error("❌ No user data extracted");
            throw new Error("No user data in API response");
          }

          // Validate required user fields
          if (!user.email && !user.id) {
            console.error("❌ User missing required fields");
            throw new Error("Invalid user data structure");
          }

          const userObject = {
            id: (user.id || user.email || "unknown").toString(),
            email: user.email || credentials.email,
            name: user.username || user.name || user.displayName || user.email,
            role: user.role || user.userType || 'User',
            token: token,
            refreshToken: refresh,
          };

          console.log("✅ Successfully created user object");
          console.log("👤 User:", { 
            id: userObject.id, 
            email: userObject.email, 
            name: userObject.name,
            role: userObject.role,
            hasToken: !!userObject.token,
            hasRefreshToken: !!userObject.refreshToken
          });

          return userObject;

        } catch (error) {
          console.error("❌ Authorization error:", error.message);

          if (axios.isAxiosError(error)) {
            console.error("🌐 Axios error details:", {
              code: error.code,
              status: error.response?.status,
              statusText: error.response?.statusText,
              url: error.config?.url,
              method: error.config?.method
            });

            if (error.code === 'ECONNREFUSED') {
              throw new Error("Cannot connect to authentication server. Please check if the API is running.");
            }

            if (error.code === 'ENOTFOUND') {
              throw new Error("Authentication server not found. Please check the API URL.");
            }

            if (error.code === 'ETIMEDOUT') {
              throw new Error("Authentication request timed out. Please try again.");
            }

            if (error.response?.status === 400) {
              const apiError = error.response.data?.message || error.response.data?.error || "Bad Request";
              throw new Error(`Invalid request: ${apiError}`);
            }

            if (error.response?.status === 401) {
              throw new Error("Invalid email or password");
            }

            if (error.response?.status === 403) {
              throw new Error("Account access forbidden");
            }

            if (error.response?.status === 422) {
              throw new Error("Invalid input data format");
            }

            if (error.response?.status >= 500) {
              throw new Error("Authentication server error. Please try again later.");
            }

            throw new Error(`API Error: ${error.response?.status} - ${error.response?.data?.message || error.response?.statusText || 'Unknown error'}`);
          }

          // Re-throw the error if it's already a custom error message
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        console.log("📝 Adding user data to JWT token");
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.token;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          role: token.role,
          token: token.accessToken,
          refreshToken: token.refreshToken,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, 
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

export default function auth(req, res) {
  return NextAuth(req, res, authOptions);
}