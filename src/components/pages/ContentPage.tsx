import { ContentPageContent } from '@/utils/fetch-content-page-content';

type Props = {
  content: ContentPageContent;
};

const ContentPage: React.FC<Props> = ({ content }) => {
  console.log(content);
  return <div>Je suis un ContentPage</div>;
};

export default ContentPage;
