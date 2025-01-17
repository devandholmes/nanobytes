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

  const challenges = await prisma.challenge.findMany({
    where: {
      submissions: {
        none: {
          userId: user.id,
          status: 'COMPLETED',
        },
      },
    },
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json({ active: challenges });
}