import { useEffect, useRef, useState, type FormEvent } from 'react'
import clsx from 'clsx'
import { Button, Card, Input, LoadingSpinner, Select, Textarea, Checkbox } from '../../components'
import { contactEmail, projectOptions } from './content'
import { EmailIcon } from './icons'

const PHONE_PATTERN = '^0\\d(?:[- ]?\\d){7,8}$'
const PHONE_REGEX = new RegExp(PHONE_PATTERN)

type ContactFormValues = {
  fullName: string
  phone: string
  projectType: string
  description: string
}

type SubmitStatus = 'idle' | 'pending' | 'success' | 'error'

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>

const toStringValue = (entry: FormDataEntryValue | null) => (typeof entry === 'string' ? entry : '')

const validateValues = (values: ContactFormValues): FieldErrors => {
  const errors: FieldErrors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'יש להזין שם מלא.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'יש להזין מספר טלפון.'
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = 'מספר הטלפון שהוזן אינו תקין.'
  }

  if (!values.projectType) {
    errors.projectType = 'בחרו את סוג הפרויקט.'
  }

  if (!values.description.trim()) {
    errors.description = 'אנא תארו את הפרויקט בקצרה.'
  }

  return errors
}

const ContactSection = () => {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [privacyError, setPrivacyError] = useState('')
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status !== 'idle' && statusRef.current) {
      statusRef.current.focus()
    }
  }, [status])

  const validateForm = (values: ContactFormValues): boolean => {
    const errors = validateValues(values)
    setFieldErrors(errors)

    if (!privacyConsent) {
      setPrivacyError('יש לאשר את מדיניות הפרטיות.')
      return false
    } else {
      setPrivacyError('')
    }

    return Object.keys(errors).length === 0
  }

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const values: ContactFormValues = {
      fullName: toStringValue(data.get('fullName')),
      phone: toStringValue(data.get('phone')),
      projectType: toStringValue(data.get('projectType')),
      description: toStringValue(data.get('description')),
    }

    if (!validateForm(values)) {
      setStatus('error')
      setStatusMessage('אנא ודאו שכל השדות מולאו כראוי והשליחה תבוצע מחדש.')
      return
    }

    setFieldErrors({})
    setStatus('pending')
    setStatusMessage('שולח את הבקשה...')

    try {
      // שליחה ל-Formspree
      const response = await fetch('https://formspree.io/f/mvgwnwnv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.fullName,
          phone: values.phone,
          projectType: values.projectType,
          description: values.description,
          _subject: 'בקשה חדשה מאתר T.S אינסטלציה',
          _replyto: contactEmail,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setStatusMessage('הבקשה התקבלה! נחזור אליכם בהקדם.')
        form.reset()
        setPrivacyConsent(false)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Contact form submission error', error)
      setStatus('error')
      setStatusMessage('אירעה תקלה בזמן השליחה. נסו שוב בעוד כמה רגעים.')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    void submitForm(event)
  }

  const showSpinner = status === 'pending'
  const messageTone = status === 'success' ? 'text-success' : status === 'error' ? 'text-error' : 'text-neutral-600'

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-accent-light py-8 sm:py-12 lg:py-16" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 id="contact-heading" className="mb-4 text-2xl font-black leading-tight text-neutral-700 sm:text-3xl sm:mb-6 lg:text-4xl lg:mb-8 xl:text-5xl">
            מתכננים פרויקט אינסטלציה?
          </h2>
          <p className="text-base font-medium leading-7 text-neutral-600 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9 xl:text-2xl">
            השאירו פרטים לתיאום שיחה וייעוץ מקצועי.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-4xl sm:mt-8 lg:mt-10">
          <Card variant="glass" padding="lg" rounded="3xl">
            <form onSubmit={handleSubmit} className="space-y-8" aria-describedby="contact-form-description" noValidate>
              <fieldset className="space-y-8">
                <legend className="sr-only">פרטי יצירת קשר</legend>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  label="שם מלא"
                  type="text"
                  name="fullName"
                  required
                  autoComplete="name"
                  placeholder="הכנס את שמך המלא"
                  fullWidth
                  error={fieldErrors.fullName}
                />
                <Input
                  label="טלפון"
                  type="tel"
                  name="phone"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  dir="ltr"
                  pattern={PHONE_PATTERN}
                  placeholder="050-4020170"
                  fullWidth
                  error={fieldErrors.phone}
                />
              </div>

              <Select
                label="אופי הפרויקט"
                options={projectOptions}
                name="projectType"
                required
                fullWidth
                error={fieldErrors.projectType}
                placeholder="בחרו אופי פרויקט"
              />

              <Textarea
                label="תיאור הפרויקט"
                rows={6}
                name="description"
                required
                placeholder="אנא תארו את הפרויקט הנדרש בפירוט..."
                fullWidth
                error={fieldErrors.description}
              />

              <Checkbox
                checked={privacyConsent}
                onChange={(e) => {
                  setPrivacyConsent(e.target.checked)
                  if (privacyError) setPrivacyError('')
                }}
                error={privacyError}
                required
              >
                <span className="text-sm text-neutral-600">
                  אני מסכים ל{' '}
                  <a href="/privacy-policy" className="text-primary-600 hover:underline font-medium">
                    מדיניות הפרטיות
                  </a>
                  {' '}ולטיפול במידע האישי שלי לצורך יצירת קשר.
                </span>
              </Checkbox>

                <div className="pt-6 text-center">
                  <Button
                    type="submit"
                    size="xl"
                    variant="primary"
                    icon={<EmailIcon className="h-6 w-6" />}
                    loading={showSpinner}
                    aria-label={showSpinner ? 'שולח בקשה...' : 'שלח בקשה'}
                  >
                    שלח בקשה
                  </Button>
                </div>
              </fieldset>
            </form>

            {statusMessage && (
              <div
                ref={statusRef}
                tabIndex={-1}
                className={clsx('mt-xl text-center text-lg font-medium', messageTone)}
                role="status"
                aria-live="polite"
              >
                {statusMessage}
              </div>
            )}

            {showSpinner && <LoadingSpinner fullScreen label="שולח בקשה..." />}

            <div className="mt-8 border-t border-accent-border pt-8 text-center">
              <p id="contact-form-description" className="text-lg font-medium text-neutral-600">
                או שלח ישירות למייל:{' '}
                <a href={`mailto:${contactEmail}`} className="font-bold text-neutral-700 hover:underline">
                  {contactEmail}
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ContactSection