import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import pages from './pages'
import { Suspense, useEffect, useState } from 'react';

const pagesNames = Object.keys(pages);

export default function App() {
  const [index, setIndex] = useState(-1);
  const onSelect = (index: number) => {
    const page = pagesNames[index];
    history.pushState({ page }, page, "?page=" + page);
    setIndex(index);
  }
  useEffect(() => {
    const handleChange = () => {
      const page = new URLSearchParams(location.search).get('page');
      if (page) {
        setIndex(pagesNames.indexOf(page));
      } else {
        setIndex(0);
      }
    };
    handleChange();
    window.addEventListener("popstate", handleChange);
    return () => {
      window.removeEventListener("popstate", handleChange);
    }
  }, []);
  if (index === -1) {
    return <p>loading...</p>
  }
  return (
    <Tabs onSelect={onSelect} selectedIndex={index}>
      <TabList>
        {
          pagesNames.map(name => {
            return (
              <Tab key={name}>
                <span style={{ textTransform: 'capitalize' }}>{name}</span>
              </Tab>
            )
          })
        }
      </TabList>
      {
        Object.keys(pages).map(name => {
          const Page = pages[name];
          return (
            <TabPanel key={name}>
              <Suspense fallback={<p>loading...</p>}>
                <Page />
              </Suspense>
            </TabPanel>
          )
        })
      }
    </Tabs>
  )
}
