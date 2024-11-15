import { User } from '@prisma/client';
import { useQuery } from 'react-query';
import Link from 'next/link';

interface StudentDashboardProps {
  user: User;
}

export default function StudentDashboard({ user }: StudentDashboardProps) {
  const { data: challenges } = useQuery('studentChallenges', async () => {
    const response = await fetch('/api/challenges/student');
    return response.json();
  });

  const { data: progress } = useQuery('studentProgress', async () => {
    const response = await fetch('/api/progress');
    return response.json();
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
        <p className="text-gray-600">Track your progress and start new challenges</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
          <div className="space-y-2">
            <p>Completed Challenges: {progress?.completedChallenges || 0}</p>
            <p>Average Score: {progress?.averageScore || 0}%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Active Challenges</h2>
          <div className="space-y-2">
            {challenges?.active?.map((challenge: any) => (
              <Link
                key={challenge.id}
                href={`/challenges/${challenge.id}`}
                className="block p-3 rounded bg-gray-50 hover:bg-gray-100"
              >
                {challenge.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/challenges"
              className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Browse Challenges
            </Link>
            <Link
              href="/sandbox"
              className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Open Sandbox
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}