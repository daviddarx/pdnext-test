import loadJsonFiles from '@/utils/load-json-files';

export interface OnsContent {
  ons: any[];
}
export async function fetchOnsContent(): Promise<OnsContent> {
  // const onsDir: OnsType[] = [];
  const onsDir: [] = [];
  const ons = await loadJsonFiles(onsDir, '_content/events-ons');

  // ons.sort((a, b) => a.order - b.order);

  return {
    ons: ons,
  };
}
