// ✅ Decode JWT token untuk mendapatkan userId yang benar
export function getUserId(): string {
  if (typeof window === "undefined") {
    // kalau dipanggil di server (Next.js SSR)
    return "guest-server";
  }

  try {
    // 1️⃣ Coba ambil token dari localStorage
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode JWT payload (format: header.payload.signature)
        const parts = token.split(".");
        if (parts.length !== 3) throw new Error("Invalid JWT format");

        const payload = JSON.parse(atob(parts[1]));
        // JWT payload biasanya: { id, email, name, exp }
        if (payload?.id) {
          // Cek apakah token expired (optional)
          if (payload.exp && Date.now() / 1000 > payload.exp) {
            console.warn("⚠️ JWT token expired — fallback to guest");
          } else {
            return payload.id;
          }
        }
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }

    // 2️⃣ Fallback: pakai userId guest yang sudah ada
    const guestId = localStorage.getItem("userId");
    if (guestId) return guestId;

    // 3️⃣ Kalau belum ada, generate baru
    const newGuestId = `guest-${crypto.randomUUID()}`;
    localStorage.setItem("userId", newGuestId);
    return newGuestId;
  } catch (err) {
    console.error("getUserId error:", err);
    return "guest-fallback";
  }
}
