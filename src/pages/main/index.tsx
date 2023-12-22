import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} className="mr-2">
          count is {count}
        </button>
        <button onClick={() => {
          setCount(0)
        }}>reset</button>
      </div>
    </>
  )
}

export default App
