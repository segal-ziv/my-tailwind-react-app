import clsx from 'clsx'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'white' | 'neutral'
  fullScreen?: boolean
  label?: string
}

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
} as const

const colors = {
  primary: 'text-primary-600',
  white: 'text-white',
  neutral: 'text-neutral-600',
} as const

const LoadingSpinner = ({ size = 'md', color = 'primary', fullScreen = false, label = 'טוען...' }: LoadingSpinnerProps) => {
  const spinnerClasses = clsx('animate-spin', sizes[size], colors[color])

  const content = (
    <>
      <svg className={spinnerClasses} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      {label && (
        <span
          className={clsx('sr-only', {
            'not-sr-only mt-4 text-sm font-medium': size === 'lg' || size === 'xl',
          })}
        >
          {label}
        </span>
      )}
    </>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm" role="status" aria-live="polite">
        <div className="flex flex-col items-center text-center text-primary-600">{content}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center p-4" role="status" aria-live="polite">
      {content}
    </div>
  )
}

export default LoadingSpinner
