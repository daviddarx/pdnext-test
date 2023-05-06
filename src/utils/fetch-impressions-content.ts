import loadJsonFiles from '@/utils/load-json-files';

export interface ImpressionsContent {
  impressions: any[];
}
export async function fetchImpressionsContent(): Promise<ImpressionsContent> {
  // const impressionsDir: ImpressionsType[] = [];
  const impressionsDir: [] = [];
  const impressions = await loadJsonFiles(impressionsDir, '_content/impressions');

  // impressions.sort((a, b) => a.order - b.order);

  // log image to help clean images folder (empty folder, and add again the listed images)
  // entries.map((entry) => {
  //   console.log(entry.image.split('images/uploads/')[1]);
  // });

  return {
    impressions: impressions,
  };
}
