import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChallengeType } from '@prisma/client';
import QuizBuilder from './QuizBuilder';
import RoboticsBuilder from './RoboticsBuilder';

export default function ChallengeForm() {
  const router = useRouter();
  const [type, setType] = useState<ChallengeType>('QUIZ');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/teacher/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/teacher/challenges');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create challenge');
      }
    } catch (err) {
      setError('An error occurred while creating the challenge');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Challenge Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as ChallengeType)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="QUIZ">Quiz</option>
          <option value="ROBOTICS">Robotics Challenge</option>
        </select>
      </div>

      {type === 'QUIZ' ? (
        <QuizBuilder onSubmit={handleSubmit} loading={loading} />
      ) : (
        <RoboticsBuilder onSubmit={handleSubmit} loading={loading} />
      )}
    </div>
  );
}