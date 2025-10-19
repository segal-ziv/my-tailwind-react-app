import { forwardRef } from 'react'
import clsx from 'clsx'
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  Ref,
} from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'phone'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  children: ReactNode
  href?: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
  rel?: string
}

const baseStyles = 'relative inline-flex items-center justify-center font-bold transition-all duration-base focus:outline-none focus:ring-4 focus:ring-neutral-300 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden group'

const variants = {
  primary: 'bg-neutral-800 text-white hover:bg-neutral-900 hover:shadow-xl hover:-translate-y-0.5 active:bg-black',
  secondary: 'bg-accent-cream text-neutral-700 hover:bg-accent-sand hover:shadow-lg hover:-translate-y-0.5',
  outline: 'border-2 border-neutral-700 text-neutral-700 hover:bg-neutral-50 hover:shadow-md',
  ghost: 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-800',
  whatsapp: 'bg-green-500 text-white hover:bg-green-600 hover:shadow-xl hover:-translate-y-0.5 active:bg-green-700',
  phone: 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-xl hover:-translate-y-0.5 active:bg-blue-700',
} as const

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-2',
  md: 'px-6 py-3 text-base rounded-xl gap-3',
  lg: 'px-8 py-4 text-lg rounded-2xl gap-3',
  xl: 'px-12 py-6 text-xl rounded-2xl gap-4',
} as const

const ensureSafeRel = (rel: string | undefined, target?: string) => {
  if (target !== '_blank') {
    return rel
  }

  const relTokens = new Set((rel ?? '').split(' ').filter(Boolean))
  relTokens.add('noopener')
  relTokens.add('noreferrer')
  return Array.from(relTokens).join(' ') || 'noopener noreferrer'
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      icon,
      iconPosition = 'left',
      children,
      className,
      disabled,
      href,
      target,
      rel,
      ...props
    },
    ref,
  ) => {
    const classes = clsx(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className)

    const content = (
      <>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
            <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z" />
            </svg>
            <span className="sr-only" aria-live="polite">
              בטעינה...
            </span>
          </div>
        )}
        <span className={clsx('flex items-center gap-2', loading && 'invisible')}>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </span>
        {variant === 'primary' && <span className="absolute inset-0 transition-opacity duration-base group-hover:opacity-10 bg-white opacity-0" />}
      </>
    )

    if (href) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={ensureSafeRel(rel, target)}
          className={classes}
          aria-disabled={disabled || loading}
          aria-busy={loading}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
