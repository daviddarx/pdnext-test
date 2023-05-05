import { OnsContent } from '@/utils/fetch-ons-content';

type Props = {
  content: OnsContent;
};

const OnsPage: React.FC<Props> = ({ content }) => {
  console.log(content);
  return <div>Je suis un OnsPage:</div>;
};

export default OnsPage;
