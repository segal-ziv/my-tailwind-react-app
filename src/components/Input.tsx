import { forwardRef, useId, useState } from 'react'
import clsx from 'clsx'
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

const fieldSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
} as const

const iconPadding = {
  left: {
    sm: 'pl-10',
    md: 'pl-12',
    lg: 'pl-14',
  },
  right: {
    sm: 'pr-10',
    md: 'pr-12',
    lg: 'pr-14',
  },
} as const

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  size?: keyof typeof fieldSizes
  fullWidth?: boolean
  icon?: ReactNode
  iconPosition?: keyof typeof iconPadding
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      fullWidth = false,
      icon,
      iconPosition = 'left',
      className,
      id,
      required,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const helperId = error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
    const [focused, setFocused] = useState(false)

    const inputClasses = clsx(
      'w-full rounded-xl border-2 font-medium transition-all duration-base focus:outline-none focus:ring-4',
      fieldSizes[size],
      {
        'border-error focus:border-error focus:ring-error/20': Boolean(error),
        'border-accent-border focus:border-primary-600 focus:ring-primary-300/30': !error && !focused,
        'bg-accent-cream': focused && !error,
        'bg-white': !focused,
      },
      icon && iconPadding[iconPosition]?.[size],
      fullWidth && 'w-full',
      className,
    )

    return (
      <div className={clsx(fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={inputId} className={clsx('mb-2 block text-lg font-semibold text-primary-600', error && 'text-error')}>
            {label}
            {required && <span className="ml-1 text-error">*</span>}
          </label>
        )}
        <div className={clsx('relative', fullWidth && 'w-full')}>
          {icon && (
            <span
              className={clsx('pointer-events-none absolute top-1/2 -translate-y-1/2 text-neutral-500', {
                'left-4': iconPosition === 'left',
                'right-4': iconPosition === 'right',
              })}
            >
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={helperId}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-2 text-sm font-medium text-error">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-2 text-sm text-neutral-600">
            {helperText}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  size?: keyof typeof fieldSizes
  fullWidth?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      fullWidth = false,
      className,
      id,
      required,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const textareaId = id ?? generatedId
    const helperId = error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
    const [focused, setFocused] = useState(false)

    const textareaClasses = clsx(
      'w-full resize-none rounded-xl border-2 font-medium transition-all duration-base focus:outline-none focus:ring-4',
      fieldSizes[size],
      {
        'border-error focus:border-error focus:ring-error/20': Boolean(error),
        'border-accent-border focus:border-primary-600 focus:ring-primary-300/30': !error && !focused,
        'bg-accent-cream': focused && !error,
        'bg-white': !focused,
      },
      fullWidth && 'w-full',
      className,
    )

    return (
      <div className={clsx(fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={textareaId} className={clsx('mb-2 block text-lg font-semibold text-primary-600', error && 'text-error')}>
            {label}
            {required && <span className="ml-1 text-error">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={helperId}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-2 text-sm font-medium text-error">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-2 text-sm text-neutral-600">
            {helperText}
          </p>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  size?: keyof typeof fieldSizes
  fullWidth?: boolean
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      fullWidth = false,
      options,
      placeholder,
      className,
      id,
      required,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const selectId = id ?? generatedId
    const helperId = error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
    const [focused, setFocused] = useState(false)

    const selectClasses = clsx(
      'w-full appearance-none rounded-xl border-2 bg-no-repeat bg-right font-medium transition-all duration-base focus:outline-none focus:ring-4',
      fieldSizes[size],
      {
        'border-error focus:border-error focus:ring-error/20': Boolean(error),
        'border-accent-border focus:border-primary-600 focus:ring-primary-300/30': !error && !focused,
        'bg-accent-cream': focused && !error,
        'bg-white': !focused,
      },
      fullWidth && 'w-full',
      className,
    )

    const backgroundOffset = size === 'sm' ? '0.5rem' : size === 'md' ? '0.75rem' : '1rem'
    const paddingRight = size === 'sm' ? '2.5rem' : size === 'md' ? '3rem' : '3.5rem'

    return (
      <div className={clsx(fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={selectId} className={clsx('mb-2 block text-lg font-semibold text-primary-600', error && 'text-error')}>
            {label}
            {required && <span className="ml-1 text-error">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={selectClasses}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={helperId}
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
              backgroundPosition: `right ${backgroundOffset} center`,
              backgroundSize: '1.5em 1.5em',
              paddingRight,
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <p id={`${selectId}-error`} className="mt-2 text-sm font-medium text-error">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="mt-2 text-sm text-neutral-600">
            {helperText}
          </p>
        )}
      </div>
    )
  },
)

Select.displayName = 'Select'

export default Input
