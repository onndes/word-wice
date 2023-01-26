import { useState, useEffect } from 'react'

const usePosition = () => {
    const [currentPosition, setCurrentPosition] = useState(0)

    useEffect(() => {
        const handleTouchMove = () => {
            setCurrentPosition(window.pageYOffset)
        }
        const handleScroll = () => {
            setCurrentPosition(window.pageYOffset)
        }
        document.addEventListener('touchmove', handleTouchMove)
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('touchmove', handleTouchMove)
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return currentPosition
}

export default usePosition
