/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IndexPage from 'containers/index-page';

export default function App() {
  return (
    <div>
      <Helmet
        titleTemplate="Player"
        defaultTitle="Player"
      >
        <meta name="description" content="Player" />
      </Helmet>
      <IndexPage />
    </div>
      );
    };
