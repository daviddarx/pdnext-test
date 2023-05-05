import { NewsContent } from '@/utils/fetch-news-content';

type Props = {
  data: NewsContent;
};

const NewsPage: React.FC<Props> = ({ data }) => {
  console.log(data);
  return <div>Je suis un NewsPage</div>;
};

export default NewsPage;
