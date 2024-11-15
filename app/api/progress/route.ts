import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const submissions = await prisma.submission.findMany({
    where: {
      userId: user.id,
      status: 'COMPLETED',
    },
  });

  const completedChallenges = submissions.length;
  const averageScore = submissions.reduce((acc, sub) => acc + (sub.score || 0), 0) / completedChallenges || 0;

  return NextResponse.json({
    completedChallenges,
    averageScore: Math.round(averageScore * 100) / 100,
  });
}