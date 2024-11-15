import { useState } from 'react';
import { Challenge } from '@prisma/client';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface RoboticsChallengeProps {
  challenge: Challenge;
}

export default function RoboticsChallenge({ challenge }: RoboticsChallengeProps) {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { starterCode } = JSON.parse(challenge.content);

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError('Please write some code before submitting');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/challenges/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: challenge.id,
          content: JSON.stringify({ code }),
        }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to submit code');
      }
    } catch (err) {
      setError('An error occurred while submitting your code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>
      )}

      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-700 mb-6">{challenge.description}</p>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Your Code
          </label>
          <div className="h-96 border rounded-md overflow-hidden">
            <MonacoEditor
              language="javascript"
              value={code || starterCode}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
              }}
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Submitting...' : 'Submit Code'}
          </button>
        </div>
      </div>
    </div>
  );
}