interface MostReadNews {
    id: string;
    title: string;
 }

export default async function MostRead() {
    const res = await fetch('https://news-api-v2.vercel.app/api/news/most-read')
    const data = await res.json()
    const mostReadNews:MostReadNews[] = data.data
    console.log("mostReadNews", mostReadNews);
    
    return (
        <div className="card py-3 px-4 bg-base-100 border border-gray-300">
            <h2 className="font-bold text-red-700 mb-3">সর্বাধিক পঠিত</h2>

            <div className="grid gap-3">
                {
                    mostReadNews.map((n, i) => <div className="flex gap-3" key={n.id}>
                        <p className="text-xl text-red-500 font-bold">{i+1}</p>
                        <h2>{n.title}</h2>
                    </div>)
                }
            </div>
        </div>
    )
}