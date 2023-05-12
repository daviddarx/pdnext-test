import getImageDimensions from './get-image-dimensions';

export interface ContentPageContent {
  title: string;
  headerSubline?: string;
  headerTitle: string;
  lead?: string;
  video?: boolean;
  contentSlot?: {
    title: string;
    hiddenTitle?: boolean;
    anchorTitle?: string;
    image?: string;
    imageWidth?: number;
    imageHeight?: number;
    firstText?: string;
    definitionLists?: {
      title?: string;
      listItem?: {
        title: string;
        description?: string;
      }[];
    }[];
    secondText?: string;
    collapsableText?: {
      title?: string;
      text?: string;
    };
    downloads?: {
      downloadTitle: string;
      fileTypeWeight: string;
      file: string;
    }[];
  }[];
}

export async function fetchContentPageContent(json: string): Promise<ContentPageContent> {
  const data = require('../../_content/contentPages/' + json) as ContentPageContent;

  if (data.contentSlot) {
    for (const slot of data.contentSlot) {
      if (slot.image) {
        // log image to help clean images folder (empty folder, and add again the listed images)
        // console.log(slot.image.split('images/uploads/')[1]);

        const dimensions = getImageDimensions(`public${slot.image}`);
        slot.imageWidth = dimensions.width;
        slot.imageHeight = dimensions.height;
      }
    }
  }

  return data;
}
