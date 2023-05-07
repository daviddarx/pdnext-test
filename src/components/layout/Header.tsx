import React from 'react';
import Link from 'next/link';

import { CommonPageData } from '@/utils/fetch-common-page-content';

import SaveTheDate from '@/components/layout/SaveTheDate';
import SpecialAnnouncement from '@/components/layout/SpecialAnnouncement';
import PornyLogo from '@/components/logos/PornyLogo';

type Props = {
  commonPageData: CommonPageData;
};

const Header: React.FC<Props> = ({ commonPageData }) => {
  return (
    <header className='header'>
      <div className='header__top-bar'>
        <SaveTheDate data={commonPageData.saveTheDateData} />
        <SpecialAnnouncement data={commonPageData.specialAnnouncementData} />
      </div>

      <Link href='/festival-program'>
        <h2 className='hidden'>Porny Days – Film Kunst Festival Zürich</h2>
        <PornyLogo className='header__logo' />
      </Link>
    </header>
  );
};

export default React.memo(Header);
