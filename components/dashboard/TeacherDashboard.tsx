import { User } from '@prisma/client';
import { useQuery } from 'react-query';
import Link from 'next/link';

interface TeacherDashboardProps {
  user: User;
}

export default function TeacherDashboard({ user }: TeacherDashboardProps) {
  const { data: stats } = useQuery('teacherStats', async () => {
    const response = await fetch('/api/teacher/stats');
    return response.json();
  });

  const { data: recentSubmissions } = useQuery('recentSubmissions', async () => {
    const response = await fetch('/api/teacher/submissions/recent');
    return response.json();
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <p className="text-gray-600">Manage your challenges and student progress</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <div className="space-y-2">
            <p>Active Students: {stats?.activeStudents || 0}</p>
            <p>Total Challenges: {stats?.totalChallenges || 0}</p>
            <p>Pending Reviews: {stats?.pendingReviews || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
          <div className="space-y-2">
            {recentSubmissions?.map((submission: any) => (
              <Link
                key={submission.id}
                href={`/teacher/submissions/${submission.id}`}
                className="block p-3 rounded bg-gray-50 hover:bg-gray-100"
              >
                <div className="text-sm font-medium">{submission.student.name}</div>
                <div className="text-xs text-gray-500">{submission.challenge.title}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/teacher/challenges/new"
              className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Create Challenge
            </Link>
            <Link
              href="/teacher/submissions"
              className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Review Submissions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}