import { ReferendumData } from '@/script/crawlers/referendum';

export async function getReferendumData(): Promise<ReferendumData> {
  const response = await fetch(
    'https://raw.githubusercontent.com/SiongSng/2022-election/data/data/referendum.json',
    {
      cache: 'no-cache',
    }
  );

  return await response.json();
}
