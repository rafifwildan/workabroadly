// export async function fetchScenarios() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scenarios`, {
//     cache: "no-store", // agar selalu ambil data terbaru
//   });
//   if (!res.ok) throw new Error("Failed to fetch scenarios");
//   return res.json();
// }

// export async function fetchScenarioById(id: string) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scenarios/${id}`, {
//     cache: "no-store",
//   });
//   if (!res.ok) throw new Error("Failed to fetch scenario");
//   return res.json();
// }
