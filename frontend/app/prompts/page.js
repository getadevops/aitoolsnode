// frontend/app/prompts/page.js
import Link from 'next/link';

async function getPrompts() {
  const res = await fetch('http://localhost:3001/api/prompts', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch prompts');
  }
  return res.json();
}

const PromptsPage = async () => {
  const prompts = await getPrompts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Prompts</h1>
      <div className="space-y-4">
        {prompts.map(prompt => (
          <div key={prompt._id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">
              <Link href={`/prompts/${prompt._id}`}>{prompt.title}</Link>
            </h2>
            <p className="text-gray-600">Category: {prompt.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptsPage;
