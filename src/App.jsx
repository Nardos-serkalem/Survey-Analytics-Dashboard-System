import { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard'

function App() {
  const [isDark, setIsDark] = useState(false)

  const handleToggleTheme = () => {
    setIsDark((current) => !current)
  }

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[rgba(217,107,44,0.18)] blur-3xl dark:bg-[rgba(88,135,224,0.18)]" />
      <div className="pointer-events-none absolute bottom-20 -right-24 h-80 w-80 rounded-full bg-[rgba(31,122,90,0.18)] blur-3xl dark:bg-[rgba(28,165,122,0.18)]" />
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <Dashboard isDark={isDark} onToggleTheme={handleToggleTheme} />
      </div>
    </div>
  )
}

export default App
