import { useReducer, useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import useFetch from '../hooks/useFetch'

// reducer: add, update, delete bookings
function bookingReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload]
    case 'UPDATE':
      return state.map((b) => (b.id === action.payload.id ? action.payload : b))
    case 'DELETE':
      return state.filter((b) => b.id !== action.payload)
    default:
      return state
  }
}

function TestDrive() {
  const { userName } = useContext(UserContext)
  const { data: cars } = useFetch('/cars.json')
  const [bookings, dispatch] = useReducer(bookingReducer, [])

  const emptyForm = { name: userName, phone: '', car: '', date: '' }
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [editId, setEditId] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    const newErrors = {}
    const today = new Date().toISOString().split('T')[0]

    if (form.name.trim().length < 3) newErrors.name = 'Name must be at least 3 letters'
    if (!/^[0-9]{10}$/.test(form.phone)) newErrors.phone = 'Phone must be 10 digits'
    if (!form.car) newErrors.car = 'Please select a car'
    if (!form.date) newErrors.date = 'Please select a date'
    else if (form.date < today) newErrors.date = 'Date cannot be in the past'

    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    if (editId) {
      dispatch({ type: 'UPDATE', payload: { ...form, id: editId } })
      setEditId(null)
    } else {
      dispatch({ type: 'ADD', payload: { ...form, id: Date.now() } })
    }
    setForm(emptyForm)
  }

  function handleEdit(booking) {
    setForm(booking)
    setEditId(booking.id)
    window.scrollTo(0, 0)
  }

  return (
    <div className="page">
      <h1>Book a Test Drive</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}

        <label>Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <label>Car</label>
        <select name="car" value={form.car} onChange={handleChange}>
          <option value="">-- Select car --</option>
          {cars.map((car) => (
            <option key={car.id} value={car.name}>{car.brand} {car.name}</option>
          ))}
        </select>
        {errors.car && <span className="error">{errors.car}</span>}

        <label>Date</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        {errors.date && <span className="error">{errors.date}</span>}

        <button className="btn" type="submit">{editId ? 'Update Booking' : 'Book Now'}</button>
      </form>

      <h2 style={{ marginTop: '30px' }}>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div className="booking" key={b.id}>
            <div>
              <b>{b.car}</b> on {b.date}<br />
              {b.name} | {b.phone}
            </div>
            <div>
              <button className="btn small" onClick={() => handleEdit(b)}>Edit</button>{' '}
              <button className="btn small danger" onClick={() => dispatch({ type: 'DELETE', payload: b.id })}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default TestDrive
