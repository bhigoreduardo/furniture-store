import { useState } from 'react'

import { ProtectedRoute } from '../../layouts/public/dashboard'
import Container from '../../components/ui/container'
import FormTracker from '../../components/ui/form/public/form-tracker'
import FormOrder from '../../components/ui/form/form-order'

export default function Tracker() {
  const [data, setData] = useState(null)

  return (
    <ProtectedRoute>
      <Container
        className={`flex items-center ${data && 'justify-center'} py-[100px]`}
      >
        {!data ? (
          <FormTracker setData={setData} />
        ) : (
          <div className="border border-gray-100 rounded-sm shadow-md py-6">
            <FormOrder data={data} />
          </div>
        )}
      </Container>
    </ProtectedRoute>
  )
}
