import { Outlet } from 'react-router-dom'

// parent page for nested routes (list and details)
function Cars() {
  return (
    <div className="page">
      <h1>Our Cars</h1>
      <Outlet />
    </div>
  )
}

export default Cars
