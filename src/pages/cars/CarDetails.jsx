import { useParams, Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

function CarDetails() {
  const { id } = useParams()
  const { data: cars, loading } = useFetch('/cars.json')

  if (loading) return <p>Loading...</p>

  const car = cars.find((item) => item.id === Number(id))

  if (!car) {
    return (
      <div>
        <p className="error">Car not found.</p>
        <Link to="/cars">Back to cars</Link>
      </div>
    )
  }

  return (
    <div className="details">
      <div className="card-emoji big">{car.emoji}</div>
      <h2>{car.brand} {car.name}</h2>
      <p>{car.desc}</p>
      <p><b>Fuel:</b> {car.fuel}</p>
      <p className="price">₹ {car.price} Lakh</p>
      <Link to="/test-drive" className="btn">Book Test Drive</Link>{' '}
      <Link to="/cars" className="btn outline">Back</Link>
    </div>
  )
}

export default CarDetails
