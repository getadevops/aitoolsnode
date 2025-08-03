// frontend/app/jobs/page.js
import Link from 'next/link';
import FavoriteButton from '../components/FavoriteButton';

async function getJobs() {
  const res = await fetch('http://localhost:3001/api/jobs', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch jobs');
  }
  return res.json();
}

const JobsPage = async () => {
  const jobs = await getJobs();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">AI Jobs</h1>
      <div className="space-y-4">
        {jobs.map(job => (
          <div key={job._id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">
              <Link href={`/jobs/${job._id}`}>{job.title}</Link>
            </h2>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">{job.company} - {job.location}</p>
              <FavoriteButton itemId={job._id} itemType="Job" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
