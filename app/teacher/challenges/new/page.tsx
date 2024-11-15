import ChallengeForm from '@/components/teacher/ChallengeForm';

export default function NewChallengePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Challenge</h1>
      <ChallengeForm />
    </div>
  );
}