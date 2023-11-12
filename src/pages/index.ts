import React from 'react'

const _pages = import.meta.glob<{ default: React.ComponentType<unknown> }>('./*/index.tsx')

const pages: Record<string, ReturnType<typeof React.lazy>> = {}

Object.keys(_pages).forEach(k => {
  pages[k.split('/')[1]] = React.lazy(_pages[k])
})

export default pages
