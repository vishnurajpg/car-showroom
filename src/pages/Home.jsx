import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import CarCard from '../components/CarCard'

function Home() {
  const { data: cars, loading } = useFetch('/cars.json')

  // show only first 3 cars as featured
  const featured = cars.slice(0, 3)

  return (
    <div>
      <div className="hero">
        <h1>Find Your Dream Car</h1>
        <p>Best prices, trusted brands and easy test drives.</p>
        <Link to="/cars" className="btn">Browse Cars</Link>
      </div>

      <div className="page">
        <h2>Featured Cars</h2>
        {loading ? <p>Loading...</p> : (
          <div className="grid">
            {featured.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
