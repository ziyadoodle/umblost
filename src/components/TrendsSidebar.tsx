import prisma from "@/lib/prisma";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { formatNumber } from "@/lib/utils";
import GuideButton from "./GuideButton";

export default function TrendsSidebar() {
    return (
        <div className="sticky top-[5.25rem] hidden md:block lg:w-80 w-72 h-fit flex-none space-y-5">
            <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
                <Guide />
                <TrendingTopics />
            </Suspense>
        </div>
    )
}

function Guide() {
    return (
        <>
            <GuideButton />
        </>
    )
}

const getTrendingTopics = unstable_cache(
    async () => {
        const result = await prisma.$queryRaw<{ hashtag: string, count: bigint }[]>`
            SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
            FROM posts
            GROUP BY (hashtag)
            ORDER BY count DESC, hashtag ASC
            LIMIT 5
        `;

        return result.map(row => ({
            hashtag: row.hashtag,
            count: Number(row.count)
        }))
    },
    ["trending_topics"],
    {
        revalidate: 3 * 60 * 60,
    }
)

async function TrendingTopics() {
    const trendingTopics = await getTrendingTopics();

    return (
        <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
            <div className="text-xl font-bold">Trending Topics</div>
            {trendingTopics.map(({ hashtag, count }) => {
                const title = hashtag.split("#")[1];

                return <Link key={title} href={`/hashtag/${title}`} className="block">
                    <p className="line-clamp-1 break-all font-semibold hover:underline" title={hashtag}>
                        {hashtag}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {formatNumber(count)} {count === 1 ? "post" : "posts"}
                    </p>
                </Link>
            })}
        </div>
    )
}