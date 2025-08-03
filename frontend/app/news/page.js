// frontend/app/news/page.js
import Link from 'next/link';

async function getNews() {
  const res = await fetch('http://localhost:3001/api/news', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch news');
  }
  return res.json();
}

const NewsPage = async () => {
  const news = await getNews();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">AI News</h1>
      <div className="space-y-4">
        {news.map(article => (
          <div key={article._id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">
              <a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a>
            </h2>
            <p className="text-gray-600">Source: {article.source} | Date: {new Date(article.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
