// app/scenario/[id]/simulation/page.tsx
import SimulationClient from "./SimulationClient"

export default async function SimulationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const id = resolvedParams.id

  return <SimulationClient id={id} />
}
