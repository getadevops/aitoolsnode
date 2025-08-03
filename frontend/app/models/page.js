// frontend/app/models/page.js
import Link from 'next/link';

async function getModels() {
  const res = await fetch('http://localhost:3001/api/models', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch models');
  }
  return res.json();
}

const ModelsPage = async () => {
  const models = await getModels();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">AI Models</h1>
      <div className="space-y-4">
        {models.map(model => (
          <div key={model._id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">
              <Link href={`/models/${model._id}`}>{model.name}</Link>
            </h2>
            <p className="text-gray-600">{model.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelsPage;
