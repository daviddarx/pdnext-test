import { OnsContent } from '@/types/OnsContent';

type Props = {
  content: OnsContent;
};

const OnsPage: React.FC<Props> = ({ content }) => {
  return <div>Je suis un OnsPage: {content.title}</div>;
};

export default OnsPage;
