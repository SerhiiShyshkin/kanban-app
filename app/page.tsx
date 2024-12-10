import { redirect } from 'next/navigation';

import { getBoards } from '@/lib/server-actions/board-actions';

export default async function Home() {
  const [first] = await getBoards();

  if (first) redirect(`board/${first.id}`);

  return <></>;
}
