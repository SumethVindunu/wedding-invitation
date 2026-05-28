import React, { useState } from 'react'
import styles from './RSVP.module.css'
import { useInView } from '../hooks/useInView'
import supabase from '../lib/supabaseClient'

export default function RSVP() {
  const [ref, inView] = useInView()
  const [result, setResult] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault()
    setResult("Sending....")

    const formData = new FormData(event.target)

    const name = formData.get("name")?.toString().trim()
    const phone = formData.get("phone")?.toString().trim()
    const attending = formData.get("attending")
    const guests = formData.get("guests")
    const dietary = formData.get("dietary")?.toString().trim()
    const message = formData.get("message")?.toString().trim()

    // Validation
    if (!name || !phone || !attending) {
      setResult("❌ Please fill in all required fields (Name, Phone, and Attendance).")
      return
    }

    const finalGuests = attending === 'Regretfully decline' ? 0 : parseInt(guests) || 1

    try {
      const { error } = await supabase
        .from("sumeth")
        .insert([
          {
            name,
            phone,
            attending,
            guests: finalGuests,
            dietary: dietary || null,
            message: message || null
          }
        ])

      if (error) {
        console.error("Supabase error details:", error)
        setResult(`❌ Database Error: ${error.message || "Failed to save RSVP"}`)
        return
      }

      setResult("✅ Thank you! Your RSVP has been saved.")
      event.target.reset()

      // WhatsApp Message Integration
      const whatsappNumber = "94714996108"
      const whatsappMessage = `🎉 New RSVP Received

👤 Name: ${name}
📞 Phone: ${phone}
✅ Attendance: ${attending}
👥 Guests: ${finalGuests}
🍽 Dietary: ${dietary || "None"}

💌 Message:
${message || "No message"}`

      const encodedMessage = encodeURIComponent(whatsappMessage)
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
        "_blank"
      )

    } catch (error) {
      console.error("Submission error:", error)
      setResult("❌ Error submitting form. Please try again.")
    }
  }

  return (
    <section
      className={`${styles.section} ${inView ? styles.visible : ''}`}
      ref={ref}
      id="rsvp"
    >
      <div className={styles.inner}>
        <p
          className="section-label"
          style={{ textAlign: 'center' }}
        >
          You're Invited
        </p>

        <div className="ornament">
          <span
            style={{
              fontSize: '1rem',
              color: 'var(--gold)'
            }}
          >
            ♦
          </span>
        </div>

        <h2 className={`section-title ${styles.title}`}>
          Kindly <em>RSVP</em>
        </h2>

        <p className={styles.subtitle}>
          Please respond by 31 January 2026
        </p>

        <form
          onSubmit={onSubmit}
          className={styles.form}
          noValidate
        >
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="name">Full Name</label>

              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="phone">
                Telephone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+94 7X XXX XXXX"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Will you attend?</label>

              <div className={styles.radioGroup}>
                {[
                  'Joyfully accept',
                  'Regretfully decline'
                ].map((opt) => (
                  <label
                    key={opt}
                    className={styles.radioLabel}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value={opt}
                      required
                    />

                    <span
                      className={styles.radioCustom}
                    ></span>

                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="guests">
                Number of Guests
              </label>

              <select
                id="guests"
                name="guests"
              >
                {['1', '2', '3', '4'].map((n) => (
                  <option
                    key={n}
                    value={n}
                  >
                    {n} {n === '1'
                      ? 'guest'
                      : 'guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="dietary">
              Dietary Requirements{' '}
              <span className={styles.optional}>
                (optional)
              </span>
            </label>

            <input
              id="dietary"
              name="dietary"
              type="text"
              placeholder="Vegetarian, vegan, allergies..."
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="message">
              A Note for the Couple{' '}
              <span className={styles.optional}>
                (optional)
              </span>
            </label>

            <textarea
              id="message"
              name="message"
              rows="3"
              placeholder="Share your wishes..."
            />
          </div>

          <button
            type="submit"
            className={styles.submit}
          >
            Send RSVP
          </button>

          {result && (
            <p
              className={
                result.includes("Thank you")
                  ? styles.successMsg
                  : styles.errorMsg
              }
            >
              {result}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}