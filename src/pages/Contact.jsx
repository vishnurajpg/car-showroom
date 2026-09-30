import { useState, useRef, useEffect } from 'react'

function Contact() {
  const nameRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  // focus name field when page opens
  useEffect(() => {
    nameRef.current.focus()
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}

    if (form.name.trim().length < 3) newErrors.name = 'Name must be at least 3 letters'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Enter a valid email'
    if (form.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters'

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setSuccess(false)
      return
    }

    setSuccess(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="page">
      <h1>Contact Us</h1>
      <p>📍 12, Main Road, Coimbatore | 📞 9876543210 | ✉️ hello@carzone.com</p>

      <form className="form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" ref={nameRef} value={form.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}

        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Message</label>
        <textarea name="message" rows="4" value={form.message} onChange={handleChange} />
        {errors.message && <span className="error">{errors.message}</span>}

        <button className="btn" type="submit">Send</button>
        {success && <p className="success">Thank you! We will contact you soon.</p>}
      </form>
    </div>
  )
}

export default Contact
