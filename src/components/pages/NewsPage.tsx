import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { NewsContent } from '@/utils/fetch-news-content';

import PageHeader from '@/components/layout/PageHeader';
import LoadedImage from '@/components/ui/LoadedImage';
import ActiveLink from '@/components/ui/ActiveLink';

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
                {item.longDesc || item.link ? (
                  <a href={item.longDesc ? item.detailPageLink : item.link}>
                    <div className='news-item__image-container'>
                      <LoadedImage
                        src={item.image}
                        alt={item.title}
                        width={item.imageWidth}
                        height={item.imageHeight}
                        sizes='(min-width: 1920px) 25vw, (min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw'
                      />
                    </div>
                  </a>
                ) : (
                  <div className='news-item__image-container'>
                    <LoadedImage
                      src={item.image}
                      alt={item.title}
                      width={item.imageWidth}
                      height={item.imageHeight}
                      sizes='(min-width: 1920px) 25vw, (min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw'
                    />
                  </div>
                )}
              </div>
            )}
            <div className='news-item__content'>
              <div className='news-item__date'>{item.dateReadable}</div>
              <h2 className='news-item__title'>{item.title}</h2>
              {item.shortDesc && (
                <ReactMarkdown className='news-item__desc' remarkPlugins={[remarkGfm]}>
                  {item.shortDesc}
                </ReactMarkdown>
              )}
              <div className='news-item__links'>
                {item.longDesc && (
                  <ActiveLink href={item.detailPageLink} className='news-item__link'>
                    {item.detailPageLinkTitle ? item.detailPageLinkTitle : 'Mehr erfahren'}
                  </ActiveLink>
                )}
                {item.link && (
                  <a href={item.link} className='news-item__link'>
                    {item.linkTitle ? item.linkTitle : 'Link'}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewsPage;
