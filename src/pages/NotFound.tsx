import { Link } from 'react-router-dom'
import Button from '../components/Button'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-accent-light flex items-center justify-center" dir="rtl">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">
            הדף לא נמצא
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            מצטערים, הדף שחיפשתם לא קיים או הועבר למיקום אחר.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button
              variant="primary"
              size="lg"
            >
              חזרה לעמוד הבית
            </Button>
          </Link>
          
          <div className="text-sm text-neutral-500">
            או נסו את הקישורים הבאים:
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/privacy-policy" 
              className="text-primary-600 hover:underline"
            >
              מדיניות פרטיות
            </Link>
            <Link 
              to="/cookie-policy" 
              className="text-primary-600 hover:underline"
            >
              מדיניות עוגיות
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
