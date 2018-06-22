import React from 'react';

import { AppLayout } from '../../components';
import { NewProject } from '../../features';

const breadcrumb = ['Home', 'Projects', 'New project'];

const NewProjectPage = () => {
  return (
    <AppLayout breadcrumb={breadcrumb}>
      <NewProject />
    </AppLayout>
  );
};

export default NewProjectPage;
