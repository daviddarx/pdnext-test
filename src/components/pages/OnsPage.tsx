import { OnsContent } from '@/utils/fetch-ons-content';

type Props = {
  data: OnsContent;
};

const OnsPage: React.FC<Props> = ({ data }) => {
  console.log(data);
  return <div>Je suis un OnsPage:</div>;
};

export default OnsPage;
