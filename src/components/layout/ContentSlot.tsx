import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { type ContentSlot } from '@/utils/fetch-content-page-content';
import { getCleanedAnchorID } from '@/utils/content-page';
import { Fragment } from 'react';

import LoadedImage from '@/components/ui/LoadedImage';
import ExpansableText from '@/components/layout/ExpansableText';
import classNames from 'classnames';

type Props = {
  slot: ContentSlot;
  className?: string;
};

const ContentSlot: React.FC<Props> = ({ slot, className }) => {
  const splittedLayout = slot.splittedLayout && slot.image;

  return (
    <article
      className={classNames(
        'content-slot',
        {
          'content-slot--splitted': slot.splittedLayout && slot.image,
        },
        className,
      )}
      id={getCleanedAnchorID(slot.anchorTitle)}
    >
      {slot.splittedLayout && slot.image && (
        <div className='content-slot__splitted-image'>
          <LoadedImage
            src={slot.image}
            alt={slot.title}
            width={slot.imageWidth}
            height={slot.imageHeight}
            sizes='(min-width: 1280px) 75vw, 100vw'
          />
        </div>
      )}
      <div className='content-slot__content'>
        <div></div>
        {!slot.hiddenTitle && (
          <h2
            className={classNames('content-slot__title', {
              'content-page__column': !splittedLayout,
            })}
          >
            {slot.title}
          </h2>
        )}

        {slot.firstText && slot.firstText !== '' && (
          <ReactMarkdown
            className={classNames('content-slot__first-text text-content', {
              'content-page__column': !splittedLayout,
            })}
            remarkPlugins={[remarkGfm]}
          >
            {slot.firstText}
          </ReactMarkdown>
        )}

        {slot.image && !slot.splittedLayout && (
          <div
            className={classNames('content-slot__image', {
              'content-page__column-left': !splittedLayout,
            })}
          >
            <LoadedImage
              src={slot.image}
              alt={slot.title}
              width={slot.imageWidth}
              height={slot.imageHeight}
              sizes='(min-width: 1280px) 75vw, 100vw'
            />
          </div>
        )}

        {slot.definitionLists && slot.definitionLists.length > 0 && (
          <div
            className={classNames('content-slot__definition-list', {
              'content-page__column-left': !splittedLayout,
            })}
          >
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
            className={classNames('content-slot__second-text text-content', {
              'content-page__column': !splittedLayout,
            })}
            remarkPlugins={[remarkGfm]}
          >
            {slot.secondText}
          </ReactMarkdown>
        )}

        {slot.downloads && slot.downloads.length > 0 && (
          <aside
            className={classNames('content-slot__downloads downloads text-content', {
              'content-page__column': !splittedLayout,
            })}
          >
            <h3 className='downloads__title'>Downloads</h3>
            <ul className='downloads__list'>
              {slot.downloads.map((download) => (
                <li key={download.downloadTitle} className='downloads__row'>
                  <a href={download.file} target='_blank' className='downloads__link'>
                    {download.downloadTitle}
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
      </div>
    </article>
  );
};

export default ContentSlot;
