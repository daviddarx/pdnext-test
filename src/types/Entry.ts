type entryImage = {
  image: string;
};

export type Entry = {
  typeComplement: '';
  forceBlank: boolean;
  entryType: string;
  desc: string;
  videourl: string;
  title: string;
  image: string;
  uuid: string;
  additionalImages: entryImage[];
};
