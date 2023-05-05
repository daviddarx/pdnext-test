import { ImpressionsContent } from '@/types/ImpressionsContent';

type Props = {
  content: ImpressionsContent;
};

const ImpressionsPage: React.FC<Props> = ({ content }) => {
  return <div>Je suis un ImpressionsPage: {content.title}</div>;
};

export default ImpressionsPage;
