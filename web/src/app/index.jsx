import { RouterProvider } from 'react-router-dom'

import useApp from '../hooks/use-app'
import router from './routes'
import LoaderContainer from './components/ui/loader-container'

export default function App() {
  const { isLoading } = useApp()

  return (
    <>
      {isLoading && <LoaderContainer />}
      <RouterProvider router={router} />
    </>
  )
}
