import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ContactSection from './ContactSection'

describe('ContactSection', () => {
  it('submits the form and shows a success message', async () => {
    render(<ContactSection />)

    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/שם מלא/), 'ישראל ישראלי')
    await user.type(screen.getByLabelText(/טלפון/), '0501234567')
    await user.selectOptions(screen.getByLabelText(/אופי הפרויקט/), 'residential')
    await user.type(screen.getByLabelText(/תיאור הפרויקט/), 'בדיקה של טופס אינסטלציה')

    await user.click(screen.getByRole('button', { name: /שלח בקשה/ }))

    expect(
      await screen.findByText('הבקשה התקבלה! נחזור אליכם בהקדם.', undefined, { timeout: 4000 }),
    ).toBeInTheDocument()
  })

  it('מציג הודעת שגיאה כאשר הטלפון אינו תקין', async () => {
    render(<ContactSection />)

    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/שם מלא/), 'ישראל ישראלי')
    await user.type(screen.getByLabelText(/טלפון/), '050')
    await user.selectOptions(screen.getByLabelText(/אופי הפרויקט/), 'residential')
    await user.type(screen.getByLabelText(/תיאור הפרויקט/), 'בדיקה של טופס אינסטלציה')

    await user.click(screen.getByRole('button', { name: /שלח בקשה/ }))

    expect(await screen.findByText('מספר הטלפון שהוזן אינו תקין.')).toBeInTheDocument()
  })
})
