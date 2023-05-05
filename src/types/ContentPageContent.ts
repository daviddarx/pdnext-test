export interface ContentPageContent {
  title: string;
  headerSubline?: string;
  headerTitle: string;
  lead?: string;
  contentSlot?: {
    title: string;
    hiddenTitle?: boolean;
    anchorTitle?: string;
    image?: string;
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
