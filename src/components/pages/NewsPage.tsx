import { NewsContent } from '@/types/NewsContent';

type Props = {
  content: NewsContent;
};

const NewsPage: React.FC<Props> = ({ content }) => {
  return <div>Je suis un NewsPage: {content.title}</div>;
};

export default NewsPage;
