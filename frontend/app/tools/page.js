// frontend/app/tools/page.js
import Link from 'next/link';
import Vote from '../components/Vote';
import FavoriteButton from '../components/FavoriteButton';

async function getTools() {
  const res = await fetch('http://localhost:3001/api/tools', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch tools');
  }
  return res.json();
}

const ToolsPage = async () => {
  const tools = await getTools();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">AI Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map(tool => (
          <div key={tool._id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">
              <Link href={`/tools/${tool._id}`}>{tool.name}</Link>
            </h2>
            <p className="text-gray-600">{tool.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <div>
                {tool.tags.map(tag => (
                  <span key={tag} className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center">
                <Vote initialScore={tool.upvotes - tool.downvotes} toolId={tool._id} />
                <FavoriteButton itemId={tool._id} itemType="Tool" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
