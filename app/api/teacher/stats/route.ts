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

  if (!user || user.role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [activeStudents, totalChallenges, pendingReviews] = await Promise.all([
    prisma.user.count({
      where: {
        role: 'STUDENT',
        submissions: {
          some: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
            },
          },
        },
      },
    }),
    prisma.challenge.count({
      where: {
        createdById: user.id,
      },
    }),
    prisma.submission.count({
      where: {
        challenge: {
          createdById: user.id,
        },
        status: 'PENDING',
      },
    }),
  ]);

  return NextResponse.json({
    activeStudents,
    totalChallenges,
    pendingReviews,
  });
}