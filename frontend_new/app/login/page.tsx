"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // === Handle redirect callback dari Google (JWT token) ===
  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      router.replace("/home");
    }
  }, [params, router]);

  // === Handle login manual (email/password) ===
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3010/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Login gagal, periksa email & password.");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // === Handle login via Google OAuth ===
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3010/auth/google";
  };

  // === Demo login (optional tetap dipertahankan) ===
  const handleDemoLogin = () => {
    setEmail("demo@workabroadly.com");
    setPassword("demo123");
    setTimeout(() => router.push("/home"), 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="h-[73px]" />

      <div className="flex flex-1">
        {/* Left Side - Decorative with Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden items-center justify-center p-12">
          <div
            className="absolute w-[600px] h-[600px] bg-gray-300"
            style={{
              borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
              transform: "rotate(-15deg)",
            }}
          />
          <div className="relative z-10 w-[400px] h-[500px] bg-black rounded-[50%] flex items-center justify-center shadow-2xl">
            <img
              src="/colorful-hot-air-balloon-in-sky.jpg"
              alt="Hot air balloon"
              className="w-[90%] h-[90%] object-cover rounded-[50%]"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome Back 👋
          </h1>

          <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Garis pembatas */}
          <div className="text-gray-500 text-sm">or</div>

          {/* Tombol Google (brand resmi) */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 border rounded-lg py-2 px-4 hover:bg-gray-100 transition w-full max-w-md"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #dadce0",
              borderRadius: "4px",
              fontFamily: "Roboto, arial, sans-serif",
              fontWeight: 500,
              color: "#3c4043",
              fontSize: "14px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="18"
              height="18"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.94 0 6.58 1.69 8.09 3.1l5.94-5.94C34.09 3.3 29.47 1 24 1 14.82 1 7.15 6.41 3.68 14.02l6.91 5.37C12.12 13.29 17.54 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.5 24.5c0-1.64-.15-3.21-.43-4.74H24v9.47h12.65c-.54 2.79-2.17 5.16-4.61 6.75l7.16 5.56c4.18-3.86 6.3-9.55 6.3-17.04z"
              />
              <path
                fill="#FBBC05"
                d="M10.59 28.39c-.48-1.42-.75-2.93-.75-4.39 0-1.52.27-2.99.75-4.39l-6.91-5.37C2.64 17.69 2 20.77 2 24s.64 6.31 1.68 9.76l6.91-5.37z"
              />
              <path
                fill="#4285F4"
                d="M24 46c6.48 0 11.92-2.14 15.89-5.84l-7.16-5.56c-1.99 1.35-4.54 2.16-8.73 2.16-6.46 0-11.87-3.79-13.41-9.02l-6.91 5.37C7.15 41.59 14.82 46 24 46z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Demo login */}
          <Button
            onClick={handleDemoLogin}
            variant="outline"
            className="w-full max-w-md"
          >
            Demo Login
          </Button>

          <p className="text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
