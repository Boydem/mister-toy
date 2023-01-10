import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadToys } from '../store/toy-action'

export const useToysState = () => {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  useEffect(() => {
    loadToys().catch((err) => {
      console.log('err loading toys:', err)
    })
  }, [])
  return toys
}
