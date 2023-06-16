import { useState } from 'react';
import { useRouter } from 'next/router';
import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { routes } from '@/routes/routes';
import { fetchCommonPageContent, CommonPageData } from '@/utils/fetch-common-page-content';
import { fetchGalleriesImagesContent, GalleryImage } from '@/utils/fetch-galleries-images-content';

const galleriesContent = require('../../../_content/galleries/galleries.json');

import Layout from '@/components/layout/Layout';
import Metas from '@/components/layout/Metas';
import LoadedImageCustom from '@/components/ui/LoadedImageCustom';
import CloseButton from '@/components/ui/CloseButton';
import NavButton from '@/components/ui/NavButton';
import ActiveLink from '@/components/ui/ActiveLink';
import ArrowIcon from '@/components/icons/ArrowIcon';

import PageHeader from '@/components/layout/PageHeader';

type PageProps = {
  page: {
    subline: string;
    title: string;
    lead: string;
    images: GalleryImage[];
  };
  commonPageData: CommonPageData;
};

const Page: NextPage<PageProps> = ({ page, commonPageData }) => {
  const [isGalleryOpened, setGalleryOpened] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const router = useRouter();

  const galleryImages = page.images.map((item) => {
    return { src: item.main };
  });

  const openGallery = (e: React.MouseEvent, index: number) => {
    const href = e.currentTarget.getAttribute('href');

    if (href) {
      setGalleryIndex(index);
      setGalleryOpened(true);
      e.preventDefault();
    }
  };

  const closeGallery = () => {
    setGalleryOpened(false);
  };

  const backToImpressions = (e: React.MouseEvent) => {
    const scrollPosition = window.scrollY;

    router.back();
  };

  return (
    <Layout commonPageData={commonPageData}>
      <Metas title={page.title} />

      <section className='content-page gallery-page'>
        <PageHeader subline={page.subline} title={page.title} lead={page.lead} />
        <div className='gallery-page__images'>
          {page.images.map((image, i) => (
            <a
              href={image.main}
              key={image.main}
              className='gallery-page__link'
              onClick={(e) => openGallery(e, i)}
            >
              <div className='gallery-page__image'>
                <LoadedImageCustom src={image.thumb} alt={page.title} />
              </div>
            </a>
          ))}
        </div>
        <div className='gallery-page__back'>
          <ActiveLink
            className='gallery-page__back-button'
            href={'/' + routes.secondary.impressions.slug}
            onClick={backToImpressions}
          >
            <ArrowIcon className='gallery-page__back-icon' />
            <span>{routes.secondary.impressions.title}</span>
          </ActiveLink>
        </div>
      </section>

      <Lightbox
        open={isGalleryOpened}
        close={closeGallery}
        index={galleryIndex}
        slides={galleryImages}
        plugins={[Counter]}
        animation={{
          fade: 250,
          swipe: 750,
          navigation: 500,
          easing: {
            fade: 'ease',
            swipe: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)' /* outQuint */,
            navigation: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)' /* inOutQuint */,
          },
        }}
        render={{
          iconPrev: () => (
            <NavButton className='gallery-page__nav-button' renderAsDiv={true} isPrev={true} />
          ),
          iconNext: () => <NavButton className='gallery-page__nav-button' renderAsDiv={true} />,
          iconClose: () => (
            <CloseButton className='gallery-page__close-button' renderAsDiv={true} />
          ),
        }}
        className='gallery-page__lightbox'
      />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = Object.keys(galleriesContent);
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const { slug } = params ?? {};

  const page = galleriesContent[slug as keyof typeof galleriesContent];

  const images = await fetchGalleriesImagesContent(page.folder, page.imageNumber);

  const commonPageData = await fetchCommonPageContent();

  const props: PageProps = {
    page: {
      subline: page.date,
      title: page.title,
      lead: page.lead,
      images: images,
    },
    commonPageData: commonPageData,
  };

  return {
    props: props,
  };
};

export default Page;
