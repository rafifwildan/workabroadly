export function getUserId(): string {
  // 1) kalau app-mu sudah set cookie/localStorage userId, ambil itu
  if (typeof window !== "undefined") {
    const fromLS = localStorage.getItem("userId");
    if (fromLS) return fromLS;
    // 2) fallback: generate guest id (tidak mengganggu sistem auth yg sudah ada)
    const guest = `guest-${crypto.randomUUID()}`;
    localStorage.setItem("userId", guest);
    return guest;
  }
  return "guest-server";
}
