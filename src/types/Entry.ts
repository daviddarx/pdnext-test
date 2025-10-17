export type EntryImage = {
  image: string;
  imageWidth?: number;
  imageHeight?: number;
};

export interface Entry {
  typeComplement?: string;
  forceBlank?: boolean;
  entryType: string;
  authorName?: string;
  authorCountry?: string;
  yearOfProduction?: number;
  duration?: string;
  desc: string;
  warning?: string;
  videourl?: string;
  title: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  uuid: string;
  pornypickof?: string;
  additionalImages?: EntryImage[];
  deactivated?: boolean;
}
