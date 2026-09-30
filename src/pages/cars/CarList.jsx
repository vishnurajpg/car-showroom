import { useSearchParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import CarCard from '../../components/CarCard'

function CarList() {
  const { data: cars, loading, error } = useFetch('/cars.json')
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const brand = searchParams.get('brand') || 'All'

  function handleChange(key, value) {
    const params = new URLSearchParams(searchParams)
    if (value === '' || value === 'All') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    setSearchParams(params)
  }

  // filter cars by brand and search text
  const filteredCars = cars.filter((car) => {
    const brandMatch = brand === 'All' || car.brand === brand
    const searchMatch = car.name.toLowerCase().includes(search.toLowerCase())
    return brandMatch && searchMatch
  })

  if (loading) return <p>Loading cars...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search car name..."
          value={search}
          onChange={(e) => handleChange('search', e.target.value)}
        />
        <select value={brand} onChange={(e) => handleChange('brand', e.target.value)}>
          <option>All</option>
          <option>Maruti</option>
          <option>Hyundai</option>
          <option>Tata</option>
          <option>Toyota</option>
        </select>
      </div>

      {filteredCars.length === 0 ? (
        <p>No cars found.</p>
      ) : (
        <div className="grid">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CarList
