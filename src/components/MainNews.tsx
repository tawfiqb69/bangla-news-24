import Image from 'next/image';
import Link from 'next/link';
interface News {
    id: string;
    title: string,
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string


}

const MainNews = ({ news }: { news: News[] }) => {
    // console.log("main news", news);
    const [firstNews, ...otherNews] = news
    console.log("firstNews", firstNews);
    console.log("other News", otherNews);
    return (
        <div className='flex gap-3 my-5'>
            <Link href={`/news/${firstNews.id}`}>
                <div className="card bg-base-100 w-96 shadow-sm">
                    <figure>
                        <Image
                            height={600}
                            width={600}
                            src={firstNews.imageUrl}
                            alt={firstNews.imageAlt} />
                    </figure>
                    <div className="card-body">
                        <p className='text-red-600 font-semibold'>{firstNews.category}</p>
                        <h2 className="card-title">{firstNews.title}</h2>
                        <p>{firstNews.description}</p>

                    </div>
                </div>
            </Link>


            <div className='grid gap-2'>
                {
                    otherNews.slice(0, 4).map(n =>                        
                        
                            // <Link href={`/news/${n.id}`} key={n.id}>
                                <div className=' px-3 card bg-base-100 border border-gray-300 py-5' key={n.id} >
                                
                                <p className='text-red-600 font-semibold'>{firstNews.category}</p>
                                <div> {n.title} </div>
                            </div>
                            // </Link>
                        

                    )
                }
            </div>

        </div>

    );
};

export default MainNews;