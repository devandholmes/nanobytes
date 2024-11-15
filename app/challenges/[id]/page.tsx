import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import QuizChallenge from '@/components/challenges/QuizChallenge';
import RoboticsChallenge from '@/components/challenges/RoboticsChallenge';

export default async function ChallengePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession();

  if (!session) {
    redirect('/auth/login');
  }

  const challenge = await prisma.challenge.findUnique({
    where: { id: params.id },
    include: {
      createdBy: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!challenge) {
    redirect('/challenges');
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
      <p className="text-gray-600 mb-8">Created by {challenge.createdBy.name}</p>
      
      {challenge.type === 'QUIZ' ? (
        <QuizChallenge challenge={challenge} />
      ) : (
        <RoboticsChallenge challenge={challenge} />
      )}
    </div>
  );
}