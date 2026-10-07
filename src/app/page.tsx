import NewsCard from "@/components/NewsCard";
import MainNews from "../components/MainNews";
import Marquee from "../components/Marquee";

interface IOtherSection {
  curationId: string;
  title: string;
  articles: {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
  }[];
}


export default async function Home() {
  const res = await fetch('https://news-api-v2.vercel.app/api/news/sections')
  const data = await res.json()
  const sections = data.data;
  const mainNews = sections[0].articles
  const otherSections: IOtherSection[] = sections.slice(1)
  console.log("otherSections", otherSections);
  

  return (
    <div className=" ">
      <Marquee></Marquee>

      <div className="grid grid-cols-3 max-w-6xl mx-auto">
        {/* Section 1 */}
        <div className="col-span-2 ">
            <MainNews news={mainNews}></MainNews>

            <div className="grid gap-5">
              {
                  otherSections.map(section => <div  key={section.curationId}>
                    <h1 className="font-bold mt-6 border-b-2 border-red-700 pb-1">{section.title}</h1>

                    
                    <div className="grid  grid-cols-3 gap-2 my-5">

                      {
                        section.articles.map(news => <NewsCard key={news.id} news={news}/>)                      
                      }
                      </div>
                    
                  </div>)
              }
            </div>
        </div>

        {/* Section 2 */}
        <div className="col-span-1 bg-green-700">

        </div>
      </div>
    </div>
  );
}
