import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { ContentPageContent } from '@/utils/fetch-content-page-content';
import { getCleanedAnchorID } from '@/utils/content-page';
import { Fragment } from 'react';

import PageHeader from '@/components/layout/PageHeader';
import LoadedImage from '@/components/ui/LoadedImage';
import ExpansableText from '@/components/layout/ExpansableText';
import ContentSlot from '@/components/layout/ContentSlot';
import DecorativeVideo from '../ui/DecorativeVideo';
import classNames from 'classnames';

type Props = {
  data: ContentPageContent;
};

const ContentPage: React.FC<Props> = ({ data }) => {
  const pageRef = useRef<HTMLElement>(null);

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

  const scrollToAnchor = (hash: string, smooth = true) => {
    const options = {
      behavior: smooth ? 'smooth' : 'instant',
    } as ScrollIntoViewOptions;

    pageRef?.current?.querySelector(`#${hash.slice(1)}`)?.scrollIntoView(options);
  };

  useEffect(() => {
    if (window.location.hash !== '') {
      setTimeout(() => {
        scrollToAnchor(window.location.hash, false);
      }, 50);
    }
  }, []);

  return (
    <section className='content-page' ref={pageRef}>
      <PageHeader
        subline={data.headerSubline}
        title={data.headerTitle}
        lead={data.lead}
        centered={data.headerCentered}
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
          <ContentSlot slot={slot} key={slot.title} />
        ))}
      </div>
    </section>
  );
};

export default ContentPage;
