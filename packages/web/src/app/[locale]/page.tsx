import { getHomepage } from '../../lib/api';
import HomepageClient from './HomepageClient';

export default async function HomepagePage() {
  const homepage = await getHomepage();

  return (
    <main>
      <HomepageClient data={homepage} />
    </main>
  );
}
