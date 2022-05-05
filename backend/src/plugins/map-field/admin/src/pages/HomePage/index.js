/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { Box } from '@strapi/design-system/Box';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';

const HomePage = () => {
  return (
    <Box background="neutral100">
    <BaseHeaderLayout
      title="Map Field"
      subtitle="Optimize your content to be SEO friendly"
      as="h2"
    />
  </Box>

  );
};

export default memo(HomePage);
