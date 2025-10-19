import React from 'react';
import Button from './Button';
import Card from './Card';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'אופס! משהו השתבש',
  message = 'אירעה שגיאה בלתי צפויה. אנא נסה שוב מאוחר יותר.',
  onRetry,
  fullScreen = false,
}) => {
  const content = (
    <Card variant="bordered" padding="xl" rounded="2xl" className="max-w-md mx-auto">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-error/10 mb-6">
          <svg
            className="h-8 w-8 text-error"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-3">{title}</h3>
        <p className="text-neutral-600 mb-8">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="primary" size="md">
            נסה שוב
          </Button>
        )}
      </div>
    </Card>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-4">{content}</div>;
};

export default ErrorState;