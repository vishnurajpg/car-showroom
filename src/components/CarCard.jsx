import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleWishlist } from '../store/wishlistSlice'

// props: car
function CarCard({ car }) {
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.wishlist)
  const isLiked = wishlist.some((item) => item.id === car.id)

  return (
    <div className="card">
      <div className="card-emoji">{car.emoji}</div>
      <h3>{car.name}</h3>
      <p>{car.brand} | {car.fuel}</p>
      <p className="price">₹ {car.price} Lakh</p>
      <div className="card-buttons">
        <Link to={`/cars/${car.id}`} className="btn">View</Link>
        <button className="btn outline" onClick={() => dispatch(toggleWishlist(car))}>
          {isLiked ? '❤️ Remove' : '🤍 Wishlist'}
        </button>
      </div>
    </div>
  )
}

export default CarCard
