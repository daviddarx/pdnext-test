export interface Entry {
  typeComplement?: string;
  forceBlank?: boolean;
  entryType: string;
  desc: string;
  videourl?: string;
  title: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  uuid: string;
  pornypickof?: string;
  additionalImages?: {
    image: string;
    imageWidth?: number;
    imageHeight?: number;
  }[];
  deactivated?: boolean;
}
