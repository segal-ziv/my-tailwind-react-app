import React from 'react';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  hoverable?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      rounded = 'xl',
      hoverable = false,
      clickable = false,
      className,
      children,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'relative transition-all duration-300';

    const variants = {
      default: 'bg-white shadow-md',
      elevated: 'bg-white shadow-xl',
      bordered: 'bg-white border-2 border-accent-border',
      glass: 'bg-white/80 backdrop-blur-sm shadow-xl border border-accent-border',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    };

    const roundeds = {
      none: '',
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
    };

    const interactiveStyles = clsx({
      'hover:shadow-2xl hover:-translate-y-1': hoverable && !clickable,
      'cursor-pointer hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 active:shadow-xl': clickable,
    });

    const classes = clsx(
      baseStyles,
      variants[variant],
      paddings[padding],
      roundeds[rounded],
      interactiveStyles,
      className
    );

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || !clickable) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.currentTarget.click();
      }
    };

    return (
      <div
        ref={ref}
        className={classes}
        onClick={onClick}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, children, className, ...props }, ref) => {
    const classes = clsx('flex items-start justify-between', className);

    if (children) {
      return (
        <div ref={ref} className={classes} {...props}>
          {children}
        </div>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="flex-1">
          {title && (
            <h3 className="text-2xl font-bold text-primary-600 mb-2">{title}</h3>
          )}
          {subtitle && (
            <p className="text-neutral-600">{subtitle}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0 ml-4">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => {
    const classes = clsx('', className);

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  divider?: boolean;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, divider = false, className, ...props }, ref) => {
    const classes = clsx(
      'pt-4',
      divider && 'border-t border-accent-border mt-4',
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;
