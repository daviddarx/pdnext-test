import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import classNames from 'classnames';

type Props = {
  className?: string;
  subline?: string;
  title: string;
  lead?: string;
  centered?: boolean;
};

const PageHeader: React.FC<Props> = ({ className = '', subline, title, lead, centered = true }) => {
  return (
    <header
      className={classNames(
        'page-header',
        {
          'page-header--centered': centered,
        },
        className,
      )}
    >
      <h1>
        {subline && <span className='page-header__subline'>{subline}</span>}
        <ReactMarkdown className='page-header__title' remarkPlugins={[remarkGfm]}>
          {/* Replace '.' with html entity '&#46;' to avoid '10.' to be interpreted as an ordered list, which cause error on iOS.  */}
          {title.replace('{shy}', '&shy;').replace('.', '&#46;')}
        </ReactMarkdown>
      </h1>

      {lead && <p className='page-header__lead text-content'>{lead}</p>}
    </header>
  );
};

export default PageHeader;
