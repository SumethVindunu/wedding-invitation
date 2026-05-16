import React, { useState } from 'react'
import styles from './RSVP.module.css'
import { useInView } from '../hooks/useInView'

export default function RSVP() {
  const [ref, inView] = useInView()
  const [result, setResult] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault()
    setResult("Sending....")

    const formData = new FormData(event.target)

    // Get form values
    const name = formData.get("name")
    const phone = formData.get("phone")
    const attending = formData.get("attending")
    const guests = formData.get("guests")
    const dietary = formData.get("dietary")
    const message = formData.get("message")

    // Web3Forms Access Key
    formData.append(
      "access_key",
      "595dd688-5dbc-4cb7-bd2f-c644196c856a"
    )

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData
        }
      )

      const data = await response.json()

      if (data.success) {
        setResult("✅ Thank you! Your RSVP has been sent.")

        // Reset form
        event.target.reset()

        // ===================================
        // WhatsApp Message Integration
        // ===================================

        // Replace with your WhatsApp number
        // Example: 94771234567
        const whatsappNumber = "94714996108"

        // Create WhatsApp message
        const whatsappMessage = `
🎉 New RSVP Received

👤 Name: ${name}
📞 Phone: ${phone}
✅ Attendance: ${attending}
👥 Guests: ${guests}
🍽 Dietary: ${dietary || "None"}

💌 Message:
${message || "No message"}
        `

        // Encode message
        const encodedMessage = encodeURIComponent(whatsappMessage)

        // Open WhatsApp
        window.open(
          `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
          "_blank"
        )

      } else {
        setResult("❌ Oops! Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error(error)
      setResult("❌ Error submitting form")
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