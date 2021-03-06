import React from 'react';
import AbsoluteUrl from 'next-absolute-url';
import Head from 'next/head';

import Context from '../components/context/context';
import Layout from '../components/layout/layout';
import useUser from '../components/user/useUser/useUser';

export default function Index({ context }) {
  context.useUser = useUser(context.origin);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Context.Provider value={context}>
        <Layout>
          <div>
            Main Content
          </div>
        </Layout>
      </Context.Provider>
    </div>
  )
}

export async function getServerSideProps({ req, res, query }) {
  const { origin } = AbsoluteUrl(req, 'localhost:3000');

  const context = { origin };

  if (query && query.emailVerification)
    context.emailVerification = query.emailVerification;

  if (query && query.resetPassword)
    context.resetPassword = JSON.parse(query.resetPassword);

  return { props: { context } };
}