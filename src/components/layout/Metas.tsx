import Head from 'next/head';

interface Props {
  title?: String;
}

const Metas = ({ title }: Props) => {
  const combinedTitle = `13. Porny Days / 26. - 30. November 2025 / Zürich – ${title}`;
  const description =
    'Porny Days ist ein Film Kunst Festival in Zürich: Filme, Debatten, Performances &amp; Party – von Stummfilm bis Postporn.';

  return (
    <Head>
      <title>{combinedTitle}</title>
      <meta name='description' content={description} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content='https://www.pornydays.love' />
      <meta property='og:title' content={combinedTitle} />
      <meta property='og:image:url' content='/images/pornydays.jpg' />
      <meta property='og:image:secure_url' content='/images/pornydays.jpg' />
      <meta property='og:image:type' content='image/jpeg' />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta name='format-detection' content='telephone=no' />
    </Head>
  );
};

export default Metas;
