import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ChallengeList from '@/components/challenges/ChallengeList';

export default async function ChallengesPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/auth/login');
  }

  const challenges = await prisma.challenge.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      createdBy: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Available Challenges</h1>
      <ChallengeList challenges={challenges} />
    </div>
  );
}