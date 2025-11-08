"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      router.replace("/home"); // langsung ke dashboard
    } else {
      router.replace("/login"); // kalau gak ada token, balik ke login
    }
  }, [params, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <p className="text-gray-700 text-lg font-medium">
        Signing you in, please wait...
      </p>
    </div>
  );
}
