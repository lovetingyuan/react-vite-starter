import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const useStrict = !location.search.includes('strict=off')

ReactDOM.createRoot(document.getElementById('root')!).render(
  useStrict ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  )
)
