import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="flex gap-3 my-4">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <button
          onClick={() => {
            setCount(0)
          }}
        >
          reset
        </button>
      </div>
    </>
  )
}

export default App
