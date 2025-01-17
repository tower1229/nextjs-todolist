'use client';

import Head from 'next/head';
import * as React from 'react';
import { AuthBtn } from '@/components';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from '@/public/svg/Logo.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <div className='flex flex-col min-h-screen text-center py-12 layout relative items-center justify-center'>
          <Logo className='w-16' />
          <h1 className='mt-4'>
            Next.js + Tailwind CSS + daisyUI + TypeScript Starter
          </h1>
          <p className='mt-2 text-sm text-gray-800'>
            A starter for Next.js, Tailwind CSS, daisyUI, and TypeScript with
            Seo, xs pre-configured with Husky{' '}
          </p>
          <p className='mt-2 text-sm text-gray-700'>
            <a
              className='btn btn-link'
              target='_blank'
              href='https://github.com/tower1229/nextjs-daisyui-starter'
            >
              See the repository
            </a>
          </p>

          <AuthBtn />

          <footer className='bottom-2 text-gray-700 absolute'>
            © {new Date().getFullYear()} By{' '}
            <a
              className='link'
              target='_blank'
              href='https://refined-x.com?ref=nextstarter'
            >
              Shixiong
            </a>
          </footer>
        </div>
      </section>
    </main>
  );
}
