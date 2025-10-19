import { forwardRef, useId } from 'react'
import clsx from 'clsx'
import type { InputHTMLAttributes, ReactNode } from 'react'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children?: ReactNode
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      fullWidth = false,
      children,
      className,
      id,
      required,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const checkboxId = id ?? generatedId
    const helperId = error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined

    const checkboxSize = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    }[size]

    const textSize = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }[size]

    return (
      <div className={clsx(fullWidth && 'w-full')}>
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="flex h-5 items-center">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              className={clsx(
                'rounded border-2 border-accent-border bg-white text-primary-600 transition-all duration-base focus:outline-none focus:ring-4 focus:ring-primary-300/30',
                checkboxSize,
                {
                  'border-error focus:border-error focus:ring-error/20': Boolean(error),
                  'border-accent-border focus:border-primary-600': !error,
                },
                className,
              )}
              required={required}
              aria-invalid={Boolean(error)}
              aria-describedby={helperId}
              {...props}
            />
          </div>
          <div className="flex-1">
            {label && (
              <label htmlFor={checkboxId} className={clsx('font-medium text-neutral-700', textSize, error && 'text-error')}>
                {label}
                {required && <span className="ml-1 text-error">*</span>}
              </label>
            )}
            {children && (
              <div className={clsx('mt-1', textSize, 'text-neutral-600')}>
                {children}
              </div>
            )}
          </div>
        </div>
        {error && (
          <p id={`${checkboxId}-error`} className="mt-2 text-sm font-medium text-error">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${checkboxId}-helper`} className="mt-2 text-sm text-neutral-600">
            {helperText}
          </p>
        )}
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
