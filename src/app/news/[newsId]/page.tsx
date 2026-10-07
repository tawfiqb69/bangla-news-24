import Image from "next/image";
import Link from "next/link";

interface NewsDetailsPageProps {
    params: Promise<{
        newsId: string;
    }>;
}

const NewsDetailsPage = async ({
    params,
}: NewsDetailsPageProps) => {
    const { newsId } = await params;

    const res = await fetch(
        `https://news-api-v2.vercel.app/api/article/${newsId}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch news details");
    }

    const data = await res.json();
    const newsDetails = data.data;

    return (
        <main className="container mx-auto max-w-6xl px-4 py-8">

            {/* Back Button */}
            <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:underline"
            >
                ← সব খবর
            </Link>

            {/* Article Header */}
            <article>

                {/* Category / Topics */}
                <div className="mb-4 flex flex-wrap gap-2">
                    {newsDetails.topics?.map(
                        (topic: { id: string; name: string }) => (
                            <span
                                key={topic.id}
                                className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600"
                            >
                                {topic.name}
                            </span>
                        )
                    )}
                </div>

                {/* Title */}
                <h1 className="max-w-5xl text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                    {newsDetails.title}
                </h1>

                {/* Meta Information */}
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-b pb-5 text-sm text-gray-500">
                    <span>
                        প্রকাশিত:{" "}
                        {new Date(
                            newsDetails.firstPublished
                        ).toLocaleDateString("bn-BD", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>

                    <span>•</span>

                    <span>{newsDetails.source}</span>

                    <span>•</span>

                    <span>{newsDetails.wordCount} শব্দ</span>
                </div>

                {/* Main Image */}
                <div className="relative mt-8 overflow-hidden rounded-2xl">
                    <Image
                        src={newsDetails.imageUrl}
                        alt={newsDetails.title}
                        width={1200}
                        height={675}
                        className="h-auto w-full object-cover"
                        priority
                    />
                </div>

                {/* Image Caption */}
                {newsDetails.body?.[0]?.caption && (
                    <p className="mt-2 text-sm text-gray-500">
                        {newsDetails.body[0].caption}
                    </p>
                )}

                {/* Article Content */}
                <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">

                    {/* Main Content */}
                    <div className="lg:col-span-2">

                        {/* Description */}
                        <div className="mb-8 border-l-4 border-red-600 bg-gray-50 p-5">
                            <p className="text-lg font-medium leading-8 text-gray-700">
                                {
                                    newsDetails.description?.blocks?.[0]
                                        ?.model?.blocks?.[0]?.model?.text
                                }
                            </p>
                        </div>

                        {/* Body */}
                        <div className="space-y-6 text-lg leading-9 text-gray-800">
                            {newsDetails.body?.map(
                                (
                                    item: {
                                        type: string;
                                        text?: string;
                                        url?: string;
                                        width?: number;
                                        height?: number;
                                        caption?: string;
                                        altText?: string;
                                    },
                                    index: number
                                ) => {

                                    if (item.type === "text") {
                                        return (
                                            <p key={index}>
                                                {item.text}
                                            </p>
                                        );
                                    }

                                    if (item.type === "subheading") {
                                        return (
                                            <h2
                                                key={index}
                                                className="pt-5 text-2xl font-bold leading-9 text-gray-900"
                                            >
                                                {item.text}
                                            </h2>
                                        );
                                    }

                                    if (
                                        item.type === "image" &&
                                        item.url
                                    ) {
                                        return (
                                            <figure
                                                key={index}
                                                className="my-8"
                                            >
                                                <Image
                                                    src={item.url}
                                                    alt={
                                                        item.altText ||
                                                        newsDetails.title
                                                    }
                                                    width={
                                                        item.width || 1024
                                                    }
                                                    height={
                                                        item.height || 576
                                                    }
                                                    className="h-auto w-full rounded-xl object-cover"
                                                />

                                                {item.caption && (
                                                    <figcaption className="mt-2 text-sm leading-6 text-gray-500">
                                                        {item.caption}
                                                    </figcaption>
                                                )}
                                            </figure>
                                        );
                                    }

                                    return null;
                                }
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:sticky lg:top-5 lg:self-start">

                        {/* Tags */}
                        <div className="rounded-xl border bg-white p-5 shadow-sm">
                            <h3 className="mb-4 text-xl font-bold">
                                ট্যাগ
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {newsDetails.tags?.map(
                                    (tag: string) => (
                                        <span
                                            key={tag}
                                            className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                                        >
                                            #{tag}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Source */}
                        <div className="mt-5 rounded-xl border bg-white p-5 shadow-sm">
                            <h3 className="mb-3 text-xl font-bold">
                                সূত্র
                            </h3>

                            <p className="text-gray-600">
                                {newsDetails.source}
                            </p>

                            <a
                                href={newsDetails.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-block text-sm font-medium text-red-600 hover:underline"
                            >
                                মূল খবর দেখুন →
                            </a>
                        </div>
                    </aside>
                </div>
            </article>
        </main>
    );
};

export default NewsDetailsPage;