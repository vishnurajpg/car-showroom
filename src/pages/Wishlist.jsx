import { useSelector } from 'react-redux'
import CarCard from '../components/CarCard'

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist)

  return (
    <div className="page">
      <h1>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No cars in wishlist yet.</p>
      ) : (
        <div className="grid">
          {wishlist.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
