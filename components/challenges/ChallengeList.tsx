import { Challenge, User } from '@prisma/client';
import Link from 'next/link';

type ChallengeWithCreator = Challenge & {
  createdBy: {
    name: string | null;
  };
};

interface ChallengeListProps {
  challenges: ChallengeWithCreator[];
}

export default function ChallengeList({ challenges }: ChallengeListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.map((challenge) => (
        <Link
          key={challenge.id}
          href={`/challenges/${challenge.id}`}
          className="block"
        >
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                {challenge.type}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(challenge.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {challenge.description}
            </p>
            <p className="text-sm text-gray-500">
              By {challenge.createdBy.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}