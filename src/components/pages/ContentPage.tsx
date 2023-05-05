import { ContentPageContent } from '@/utils/fetch-content-page-content';

type Props = {
  data: ContentPageContent;
};

const ContentPage: React.FC<Props> = ({ data }) => {
  console.log(data);
  return <div>Je suis un ContentPage</div>;
};

export default ContentPage;
