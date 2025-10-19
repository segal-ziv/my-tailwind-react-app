import { useState, useEffect } from 'react'
import type { ImgHTMLAttributes } from 'react'
import { useInView } from 'react-intersection-observer'
import clsx from 'clsx'

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallbackSrc?: string
  srcSet?: string
  sizes?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoadingComplete?: () => void
}

const OptimizedImage = ({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  srcSet,
  sizes,
  loading = 'lazy',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  className,
  onLoadingComplete,
  ...props
}: OptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '50px',
    skip: priority || loading === 'eager',
  })

  const shouldLoad = priority || loading === 'eager' || inView

  useEffect(() => {
    if (!shouldLoad) return

    const img = new Image()

    if (srcSet) {
      img.srcset = srcSet
    }
    if (sizes) {
      img.sizes = sizes
    }

    img.src = src

    img.onload = () => {
      setIsLoading(false)
      setHasError(false)
      onLoadingComplete?.()
    }

    img.onerror = () => {
      setIsLoading(false)
      setHasError(true)
      if (fallbackSrc && fallbackSrc !== src) {
        setImageSrc(fallbackSrc)
      }
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src, srcSet, sizes, shouldLoad, fallbackSrc, onLoadingComplete])

  const showPlaceholder = isLoading && placeholder === 'blur' && blurDataURL
  const showSkeleton = isLoading && !blurDataURL

  return (
    <div ref={ref} className={clsx('relative overflow-hidden', className)}>
      {showSkeleton && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200"
          aria-hidden="true"
        />
      )}

      {showPlaceholder && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover filter blur-xl scale-110"
        />
      )}

      {shouldLoad && (
        <img
          src={hasError ? fallbackSrc : imageSrc}
          alt={alt}
          srcSet={!hasError ? srcSet : undefined}
          sizes={sizes}
          loading={priority ? 'eager' : loading}
          decoding="async"
          className={clsx(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          {...props}
        />
      )}
    </div>
  )
}

export default OptimizedImage