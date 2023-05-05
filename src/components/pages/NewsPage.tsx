import { NewsContent } from '@/utils/fetch-news-content';

type Props = {
  content: NewsContent;
};

const NewsPage: React.FC<Props> = ({ content }) => {
  console.log(content);
  return <div>Je suis un NewsPage</div>;
};

export default NewsPage;
