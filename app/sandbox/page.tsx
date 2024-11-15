import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SandboxEditor from '@/components/sandbox/SandboxEditor';

export default async function SandboxPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Robotics Sandbox</h1>
          <p className="text-gray-600">Experiment with robotics programming in a safe environment</p>
        </div>
      </div>
      <SandboxEditor />
    </div>
  );
}