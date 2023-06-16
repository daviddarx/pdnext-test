import Head from 'next/head';

interface Props {
  title?: String;
}

const Metas = ({ title }: Props) => {
  const combinedTitle = `10. Porny Days / 23. bis 27. Nov. 2022 / Zürich – ${title}`;

  return (
    <Head>
      <title>{combinedTitle}</title>
      <meta
        property='og:description'
        content='Porny Days ist ein Film Kunst Festival in Zürich: Filme, Debatten, Performances &amp; Party – von Stummfilm bis Postporn.'
      />
      <meta property='og:url' content='https://www.pornydays.love' />
      <meta property='og:title' content='10. Porny Days / 23. bis 27. Nov. 2022 / Zürich' />
      <meta property='og:image:url' content='/images/pornydays.jpg' />
      <meta property='og:image:secure_url' content='/images/pornydays.jpg' />
      <meta property='og:image:type' content='image/jpeg' />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
    </Head>
  );
};

export default Metas;
