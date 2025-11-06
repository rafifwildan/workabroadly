import ResultsClient from "@/app/scenario/[id]/results/ResultsClient"


export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ResultsClient scenarioId={id} />
}