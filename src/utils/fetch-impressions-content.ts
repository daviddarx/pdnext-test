import loadJsonFiles from '@/utils/load-json-files';

export interface ImpressionsContent {
  impressions: any[];
}
export async function fetchImpressionsContent(): Promise<ImpressionsContent> {
  // const impressionsDir: ImpressionsType[] = [];
  const impressionsDir: [] = [];
  const impressions = await loadJsonFiles(impressionsDir, '_content/impressions');

  // impressions.sort((a, b) => a.order - b.order);

  return {
    impressions: impressions,
  };
}
