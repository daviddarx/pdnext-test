import { ImpressionsContent } from '@/utils/fetch-impressions-content';

type Props = {
  data: ImpressionsContent;
};

const ImpressionsPage: React.FC<Props> = ({ data }) => {
  console.log(data);
  return <div>Je suis un ImpressionsPage: </div>;
};

export default ImpressionsPage;
