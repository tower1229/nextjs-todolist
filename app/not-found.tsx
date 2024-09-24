'use client';

import { Metadata } from 'next';
import * as React from 'react';
import { SealWarning } from '@phosphor-icons/react';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <main>
      <section className='bg-white'>
        <div className='flex flex-col min-h-screen text-center text-black layout items-center justify-center'>
          <SealWarning
            size={60}
            className='animate-flicker text-red-500 drop-shadow-glow'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
          <a href='/'>Back to home</a>
        </div>
      </section>
    </main>
  );
}
