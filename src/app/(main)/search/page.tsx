import TrendsSidebar from "@/components/TrendsSidebar"
import { Metadata } from "next"
import SearchResults from "./SearchResults"

interface pageProps {
    searchParams: Promise<{ q: string }>
}

export async function generateMetadata({ searchParams }: pageProps): Promise<Metadata> {
    const { q } = await searchParams
    return {
        title: `Search result for "${q}"`,
    }
}

export default async function Page({ searchParams }: pageProps) {
    const { q } = await searchParams
    return (
        <main className="flex w-full min-w-0 gap-5">
            <div className="w-full min-w-0 space-y-5">
                <div className="rounded-2xl bg-card p-5 shadow-sm">
                    <h1 className="text-center text-2xl font-bold line-clamp-2 break-all">
                        Search results for <span className="text-primary">&quot;{q}&quot;</span>
                    </h1>
                </div>
                <SearchResults query={q} />
            </div>
            <TrendsSidebar />
        </main>
    )
}