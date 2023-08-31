import { useState, useEffect } from 'react'
import './App.css'
import UserForm from './UserForm'
import useGetStory from './Hooks/useGetStory'

function App() {

  const [story, setStory] = useState()

  const [currentTheme, setCurrentTheme] = useState('light')

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')
  }

  const { data, isLoading, error, fetchStory } = useGetStory()

  useEffect(() => {
    if (data) {
      setStory(data.data.choices[0].message.content)
    }
  }, [data])

  // useEffect that pays attention to changes in currentTheme
  useEffect(() => {
    document.body.className = currentTheme
  }, [currentTheme])

  return (
    <>
      <div className={`app ${currentTheme}`}>
        <button className={'dark-mode-btn'} onClick={toggleTheme}>Toggle Dark Mode</button>
        <UserForm currentTheme={currentTheme} fetchStory={fetchStory} />
        {isLoading ? <h1>Loading...</h1> : story}
      </div>
    </>
  )
}

export default App
