import NewsCard from '@/components/NewsCard';
import React from 'react';

interface IcategoryNews{
    id: string;
    title: string,
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string

}

const CategoryNews = async({params}: {params:{categoryId:string}}) => {
    const {categoryId} = await params
    console.log(categoryId);
    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`)
    const data = await res.json()

    const categoryNews:IcategoryNews[] = data.data;
    console.log(categoryNews);


    return (
        <div className='container mx-auto max-w-6xl'>
            <h1 className='my-5 text-2xl font-bold border-b-2  border-red-700'>{data.title}</h1>
            
            <div className='grid grid-cols-3 gap-5'>
                {
                    categoryNews.map(news => <NewsCard 
                        key={news.id}
                        news={news}
                        />)
                }
            </div>
        </div>
    );
};

export default CategoryNews;