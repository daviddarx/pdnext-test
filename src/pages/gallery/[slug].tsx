import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

import { fetchCommonPageContent, CommonPageData } from '@/utils/fetch-common-page-content';
import { fetchGalleriesImagesContent, GalleryImage } from '@/utils/fetch-galleries-images-content';

const galleriesContent = require('../../../_content/galleries/galleries.json');

import Layout from '@/components/layout/Layout';
import Metas from '@/components/layout/Metas';

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
  return (
    <Layout commonPageData={commonPageData}>
      <Metas title={page.title} />

      <section className='content-page gallery-page'>
        <PageHeader subline={page.subline} title={page.title} lead={page.lead} />

        <div className='gallery-page__images'>
          {page.images.map((image) => (
            <div className='gallery-page__image' key={image.main.url}>
              <Image
                src={image.thumb.url}
                alt={page.title}
                width={image.thumb.width}
                height={image.thumb.height}
              />
            </div>
          ))}
        </div>
      </section>
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
