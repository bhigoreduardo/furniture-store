import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Public from './layouts/public'
import SignIn from './pages/public/sign-in'
import DefaultProvider from './providers/default'

export default function App() {
  return (
    <DefaultProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Public />}>
            <Route index element={<SignIn />} />
          </Route>
        </Routes>
      </Router>
    </DefaultProvider>
  )
}
