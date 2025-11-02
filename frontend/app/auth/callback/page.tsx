"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setAuthToken } from "@/lib/auth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Processing authentication...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // STEP 1: Ambil token dari URL query params
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        console.log("🔍 DEBUG - Token:", token ? "ADA (length: " + token.length + ")" : "TIDAK ADA");
        console.log("🔍 DEBUG - Error param:", error);
        console.log("🔍 DEBUG - API URL:", process.env.NEXT_PUBLIC_API_URL);

        // STEP 2: Check jika ada error dari backend
        if (error) {
          setStatus("error");
          setMessage(
            error === "authentication_failed"
              ? "Authentication failed. Please try again."
              : "An error occurred during login."
          );
          
          setTimeout(() => {
            router.push("/login");
          }, 3000);
          return;
        }

        // STEP 3: Check jika token tidak ada
        if (!token) {
          setStatus("error");
          setMessage("No authentication token received.");
          setTimeout(() => {
            router.push("/login");
          }, 3000);
          return;
        }

        // STEP 4: Simpan token ke localStorage
        setAuthToken(token);
        
        // Simpan juga ke cookie untuk middleware
        const expires = new Date();
        expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
        document.cookie = `workabroadly_token=${token};expires=${expires.toUTCString()};path=/`;
        
        console.log("✅ Token saved successfully");

        // STEP 5: Verify token dengan get user info
        const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/me`;
        console.log("🔍 DEBUG - Fetch URL:", fetchUrl);
        
        const response = await fetch(fetchUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("🔍 DEBUG - Response status:", response.status);
        console.log("🔍 DEBUG - Response ok:", response.ok);

        if (!response.ok) {
          // Log response body untuk debugging
          const errorText = await response.text();
          console.error("❌ Response error:", errorText);
          throw new Error(`Failed to verify token. Status: ${response.status}. Error: ${errorText}`);
        }

        const user = await response.json();
        console.log("✅ User authenticated:", user);

        setStatus("success");
        setMessage(`Welcome, ${user.name}!`);

        // STEP 6: Redirect ke home/dashboard
        setTimeout(() => {
          router.push("/home");
        }, 1500);

      } catch (error) {
        console.error("❌ Callback error:", error);
        setStatus("error");
        setMessage("Failed to complete authentication.");
        
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        {/* Loading spinner */}
        {status === "loading" && (
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        )}
        
        {/* Success icon */}
        {status === "success" && (
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
        
        {/* Error icon */}
        {status === "error" && (
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        )}

        <p className="text-lg font-medium text-foreground">{message}</p>
        
        {status === "loading" && (
          <p className="text-sm text-muted-foreground">Please wait...</p>
        )}
      </div>
    </div>
  );
}