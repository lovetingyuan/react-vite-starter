import React from 'react';

const _pages = import.meta.glob<{ default: React.ComponentType<unknown> }>('./*/index.tsx');

const pages: Record<string, ReturnType<typeof React.lazy>> = {};

Object.keys(_pages).forEach(k => {
  const comp = _pages[k];
  pages[k.split('/')[1]] = React.lazy(comp);
});

export default pages;
