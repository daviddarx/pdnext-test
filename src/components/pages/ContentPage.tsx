import { ContentPageContent } from '@/types/ContentPageContent';

type Props = {
  content: ContentPageContent;
};

const ContentPage: React.FC<Props> = ({ content }) => {
  return <div>Je suis un ContentPage: {content.title}</div>;
};

export default ContentPage;
