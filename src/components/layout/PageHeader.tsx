import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  className?: string;
  subline?: string;
  title: string;
  lead?: string;
};

const PageHeader: React.FC<Props> = ({ className, subline, title, lead }) => {
  return (
    <header className={`page-header ${className}`}>
      <h1>
        {subline && <span className='page-header__subline'>{subline}</span>}
        <ReactMarkdown className='page-header__title' remarkPlugins={[remarkGfm]}>
          {title.replace('{shy}', '&shy;')}
        </ReactMarkdown>
      </h1>

      {lead && <p className='page-header__lead'>{lead}</p>}
    </header>
  );
};

export default PageHeader;
