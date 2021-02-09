import { useEffect, useRef, useState } from 'react'

const useClickOutside = (initialIsVisible) => {
  const [isVisible, setIsVisible] = useState(initialIsVisible)
  const ref = useRef(null)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false)
    }
  }

  const tabOrEscapeHandler = (event) => {
    if (event.keyCode == 9 || event.keyCode == 27) {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    document.addEventListener('keydown', tabOrEscapeHandler, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
      document.removeEventListener('keydown', tabOrEscapeHandler, true)
    }
  })
  return { ref, isVisible, setIsVisible }
}

export default useClickOutside
