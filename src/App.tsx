import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import pages from './pages'
import { Suspense, useEffect, useState, useCallback } from 'react'

const pagesNames = Object.keys(pages)
const getPageIndex = () => {
  const page = new URLSearchParams(location.search).get('page')
  if (page) {
    const index = pagesNames.indexOf(page)
    return index
  } else {
    return 0
  }
}

export default function App() {
  const [index, setIndex] = useState(getPageIndex())
  const handleSelect = (index: number) => {
    const page = pagesNames[index]
    history.pushState({ page }, page, '?page=' + page)
    setIndex(index)
  }
  const handleNavigation = useCallback(() => {
    const index = getPageIndex()
    setIndex(index)
  }, [])
  useEffect(() => {
    window.addEventListener('popstate', handleNavigation)
    return () => {
      window.removeEventListener('popstate', handleNavigation)
    }
  }, [handleNavigation])
  return (
    <Tabs onSelect={handleSelect} selectedIndex={index}>
      <TabList>
        {pagesNames.map((name, i) => {
          return (
            <Tab key={name}>
              <span className={'capitalize ' + (i === index ? 'text-[var(--theme-color)]' : '')}>
                {name}
              </span>
            </Tab>
          )
        })}
      </TabList>
      {index === -1 ? (
        <p>
          <em>Current page is not found, please check the url.</em>
        </p>
      ) : (
        Object.keys(pages).map(name => {
          const Page = pages[name]
          return (
            <TabPanel key={name}>
              <Suspense fallback={<p>Loading...</p>}>
                <Page />
              </Suspense>
            </TabPanel>
          )
        })
      )}
    </Tabs>
  )
}
