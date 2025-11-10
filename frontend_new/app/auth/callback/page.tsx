"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { saveToken } from "@/lib/auth";

// This export tells Next.js not to pre-render this page at build time.
export const dynamic = 'force-dynamic';

function AuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get("token");
      const error = searchParams.get("error");

      if (error) {
        setStatus("error");
        switch (error) {
          case "authentication_failed":
            setErrorMessage("Authentication failed. Please try again.");
            break;
          case "server_error":
            setErrorMessage("Server error occurred. Please try again later.");
            break;
          default:
            setErrorMessage("An unknown error occurred. Please try again.");
        }
        setTimeout(() => router.push("/login"), 3000);
        return;
      }

      if (token) {
        try {
          saveToken(token);
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) throw new Error("Failed to fetch user data");

          const user = await response.json();
          if (typeof window !== "undefined") {
            localStorage.setItem("auth_user", JSON.stringify(user));
          }
          setStatus("success");
          setTimeout(() => router.push("/home"), 1500);
        } catch (error) {
          console.error("Auth callback error:", error);
          setStatus("error");
          setErrorMessage("Failed to complete authentication. Please try again.");
          setTimeout(() => router.push("/login"), 3000);
        }
      } else {
        setStatus("error");
        setErrorMessage("Invalid callback. Missing authentication token.");
        setTimeout(() => router.push("/login"), 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Completing Sign In...</h2>
            <p className="text-gray-600">Please wait while we set up your account.</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Successful!</h2>
            <p className="text-gray-600">Redirecting you to the dashboard...</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h2>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            <p className="text-sm text-gray-500">Redirecting to login page...</p>
          </>
        )}
      </div>
    </div>
  );
}

// Wrap the client component in Suspense for the initial load.
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallback />
    </Suspense>
  );
}
