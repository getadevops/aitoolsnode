// frontend/app/tools/[id]/page.js
import Link from 'next/link';

async function getTool(id) {
  const res = await fetch(`http://localhost:3001/api/tools/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch tool');
  }
  return res.json();
}

async function getAlternatives(id) {
  const res = await fetch(`http://localhost:3001/api/tools/${id}/alternatives`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch alternatives');
  }
  return res.json();
}

const ToolDetailPage = async ({ params }) => {
  const tool = await getTool(params.id);
  const alternatives = await getAlternatives(params.id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
      <p className="text-gray-600 mb-4">{tool.description}</p>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Alternative Tools</h2>
        {alternatives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {alternatives.map(alt => (
              <div key={alt._id} className="border p-4 rounded-lg">
                <h3 className="text-xl font-bold">
                  <Link href={`/tools/${alt._id}`}>{alt.name}</Link>
                </h3>
                <p className="text-gray-600">{alt.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No alternatives found.</p>
        )}
      </section>
    </div>
  );
};

export default ToolDetailPage;
