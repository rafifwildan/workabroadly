import ScenarioBriefClient from "./ScenarioBriefClient"

export default async function ScenarioBriefPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ScenarioBriefClient id={id} />
}
