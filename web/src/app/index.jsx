import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import useApp from '../hooks/use-app'
import useStore from '../hooks/use-store'
import router from './routes'
import LoaderContainer from './components/ui/loader-container'

export default function App() {
  const { isLoading, handleStore } = useApp()
  const storeData = useStore()

  useEffect(() => {
    if (storeData) handleStore(storeData)
  }, [storeData]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isLoading && <LoaderContainer />}
      <RouterProvider router={router} />
    </>
  )
}
