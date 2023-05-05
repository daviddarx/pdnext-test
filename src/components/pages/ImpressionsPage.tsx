import { ImpressionsContent } from '@/utils/fetch-impressions-content';

type Props = {
  content: ImpressionsContent;
};

const ImpressionsPage: React.FC<Props> = ({ content }) => {
  console.log(content);
  return <div>Je suis un ImpressionsPage: </div>;
};

export default ImpressionsPage;
