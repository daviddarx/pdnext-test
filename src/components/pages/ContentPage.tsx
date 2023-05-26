import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { ContentPageContent } from '@/utils/fetch-content-page-content';
import { Fragment } from 'react';

import PageHeader from '@/components/layout/PageHeader';
import LoadedImage from '@/components/ui/LoadedImage';
import ExpansableText from '@/components/layout/ExpansableText';
import DecorativeVideo from '../ui/DecorativeVideo';

type Props = {
  data: ContentPageContent;
};

const ContentPage: React.FC<Props> = ({ data }) => {
  const pageRef = useRef<HTMLElement>(null);

  const getCleanedAnchorID = (anchorID: string | undefined) => {
    if (anchorID) {
      return anchorID
        .toLowerCase()
        .replace(' ', '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    } else {
      return undefined;
    }
  };

  const anchorLinks = data.contentSlot
    ? data.contentSlot
        .filter((slot) => slot.anchorTitle !== undefined)
        .map((slot) => {
          return {
            title: slot.anchorTitle,
            hash: getCleanedAnchorID(slot.anchorTitle),
          };
        })
    : undefined;

  const handleAnchorClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const target = e.target as HTMLElement;
    const hash = target.getAttribute('href') as string;

    if (hash) scrollToAnchor(hash);
  };

  const scrollToAnchor = (hash: string) => {
    pageRef?.current?.querySelector(`#${hash.slice(1)}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (window.location.hash !== '') {
      scrollToAnchor(window.location.hash);
    }
  }, []);

  return (
    <section className='content-page' ref={pageRef}>
      <PageHeader
        subline={data.headerSubline}
        title={data.headerTitle}
        lead={data.lead}
        className='content-page__column'
      />

      {anchorLinks && anchorLinks.length > 0 && (
        <ul className='content-page__nav'>
          {anchorLinks.map((link) => (
            <li key={link.hash}>
              <a
                href={`#${link.hash}`}
                onClick={handleAnchorClick}
                className='content-page__nav-link'
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      )}

      {data.video && (
        <DecorativeVideo
          className='content-page__video'
          videoSettings={{
            urlPoster: '../../../videos/porny_2020.jpg',
            urlWebM: '../../../videos/porny_2020.webm',
            urlMp4: '../../../videos/porny_2020.mp4',
          }}
        />
      )}

      <div className='content-page__slots'>
        {data.contentSlot?.map((slot) => (
          <article
            key={slot.title}
            className='content-slot'
            id={getCleanedAnchorID(slot.anchorTitle)}
          >
            {!slot.hiddenTitle && (
              <h2 className='content-slot__title content-page__column'>{slot.title}</h2>
            )}

            {slot.firstText && slot.firstText !== '' && (
              <ReactMarkdown
                className='content-slot__first-text text-content content-page__column'
                remarkPlugins={[remarkGfm]}
              >
                {slot.firstText}
              </ReactMarkdown>
            )}

            {slot.image && (
              <LoadedImage
                className='content-slot__image content-page__column-left'
                src={slot.image}
                alt={slot.title}
                width={slot.imageWidth}
                height={slot.imageHeight}
              />
            )}

            {slot.definitionLists && slot.definitionLists.length > 0 && (
              <div className='content-slot__definition-list content-page__column-left'>
                {slot.definitionLists.map((list, i) => (
                  <div key={slot.title + i} className='definition-list'>
                    {list.title && <h3 className='definition-list__title'>{list.title}</h3>}
                    {list.listItem && (
                      <dl className='definition-list__dl'>
                        {list.listItem.map((item) => (
                          <Fragment key={item.title}>
                            <dt className='definition-list__dt'>{item.title}</dt>
                            {item.description && (
                              <dd className='definition-list__dd text-content'>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {item.description}
                                </ReactMarkdown>
                              </dd>
                            )}
                          </Fragment>
                        ))}
                      </dl>
                    )}
                  </div>
                ))}
              </div>
            )}

            {slot.secondText && slot.secondText.trim().length > 0 && (
              <ReactMarkdown
                className='content-slot__second-text text-content content-page__column'
                remarkPlugins={[remarkGfm]}
              >
                {slot.secondText}
              </ReactMarkdown>
            )}

            {slot.downloads && slot.downloads.length > 0 && (
              <aside className='content-slot__downloads downloads content-page__column text-content'>
                <h3 className='downloads__title'>Downloads</h3>
                <ul className='downloads__list'>
                  {slot.downloads.map((download) => (
                    <li key={download.downloadTitle} className='downloads__row'>
                      <a href={download.file} target='_blank'>
                        <span className='downloads__link'>{download.downloadTitle}</span>
                        <span className='downloads__detail'>{download.fileTypeWeight}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {slot.collapsableText &&
              slot.collapsableText.title &&
              slot.collapsableText.title.trim().length > 0 &&
              slot.collapsableText.text &&
              slot.collapsableText.text.trim().length > 0 && (
                <ExpansableText
                  title={slot.collapsableText.title}
                  markdown={slot.collapsableText.text}
                  className='content-slot__expandable-text'
                />
              )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default ContentPage;
