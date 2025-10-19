import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

interface UseLazyLoadOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export const useLazyLoad = <T extends HTMLElement = HTMLElement>(
  options: UseLazyLoadOptions = {}
): [RefObject<T | null>, boolean] => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
  } = options

  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)

        if (inView && triggerOnce) {
          observer.unobserve(element)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isInView]
}

export const usePrefetch = (urls: string[]) => {
  useEffect(() => {
    const prefetchLink = (url: string) => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = url
      link.as = url.match(/\.(js|jsx|ts|tsx)$/) ? 'script' : 'fetch'
      document.head.appendChild(link)
    }

    urls.forEach(prefetchLink)
  }, [urls])
}

export const useImagePreload = (imageSrcs: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(src))
      }
    }

    imageSrcs.forEach(preloadImage)
  }, [imageSrcs])

  return loadedImages
}