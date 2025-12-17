import { getHomepage } from '../lib/api';
import HomepageClient from './HomepageClient';

export default async function HomepagePage() {
  const data = await getHomepage();

  return (
    <main>
      <HomepageClient data={data} />
    </main>
  );
}
