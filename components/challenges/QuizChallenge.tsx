import { useState } from 'react';
import { Challenge } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface QuizChallengeProps {
  challenge: Challenge;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function QuizChallenge({ challenge }: QuizChallengeProps) {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const questions: Question[] = JSON.parse(challenge.content).questions;

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (answers.length !== questions.length) {
      setError('Please answer all questions');
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
          content: JSON.stringify({ answers }),
        }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to submit answers');
      }
    } catch (err) {
      setError('An error occurred while submitting your answers');
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

        <div className="space-y-6">
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="border-b pb-6 last:border-b-0">
              <p className="font-medium mb-4">
                {qIndex + 1}. {question.question}
              </p>
              <div className="space-y-2">
                {question.options.map((option, oIndex) => (
                  <label
                    key={oIndex}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      checked={answers[qIndex] === oIndex}
                      onChange={() => handleAnswerSelect(qIndex, oIndex)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Submitting...' : 'Submit Answers'}
          </button>
        </div>
      </div>
    </div>
  );
}