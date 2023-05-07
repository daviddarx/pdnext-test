import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { NewsContent } from '@/utils/fetch-news-content';

import PageHeader from '@/components/layout/PageHeader';

type Props = {
  data: NewsContent;
};

const NewsPage: React.FC<Props> = ({ data }) => {
  return (
    <section className='content-page news-page'>
      <PageHeader subline='Porny News' title='Keinen Höhepunkt verpassen' />
      <div className='news-page__news'>
        {data.news.map((item) => (
          <article key={item.date + item.title} className='news-item'>
            {item.image && (
              <div className='news-item__image'>
                {item.link ? (
                  <a href={item.link}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={item.imageWidth}
                      height={item.imageHeight}
                    />
                  </a>
                ) : (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={item.imageWidth}
                    height={item.imageHeight}
                  />
                )}
              </div>
            )}
            <div className='news-item__content'>
              <div className='news-item__date'>{item.dateReadable}</div>
              <h2 className='news-item__title'>
                {item.title} {item.imageWidth} {item.imageHeight}
              </h2>
              {item.desc && (
                <ReactMarkdown className='news-item__desc' remarkPlugins={[remarkGfm]}>
                  {item.desc}
                </ReactMarkdown>
              )}
              {item.link && <a href={item.link}>{item.linkTitle ? item.linkTitle : 'Link'}</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewsPage;
