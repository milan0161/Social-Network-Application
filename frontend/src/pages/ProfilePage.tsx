import React from 'react';

import { Outlet } from 'react-router-dom';

const ProfilePageLayout: React.FunctionComponent = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProfilePageLayout;
