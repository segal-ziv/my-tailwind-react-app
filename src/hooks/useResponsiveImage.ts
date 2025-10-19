import { useMemo } from 'react'

interface ImageSizes {
  mobile?: number
  tablet?: number
  desktop?: number
  wide?: number
}

interface ResponsiveImageResult {
  srcSet: string
  sizes: string
}

export const useResponsiveImage = (
  baseSrc: string,
  imageSizes: ImageSizes = {}
): ResponsiveImageResult => {
  const {
    mobile = 640,
    tablet = 768,
    desktop = 1024,
    wide = 1920,
  } = imageSizes

  const generateSrcSet = useMemo(() => {
    const extension = baseSrc.split('.').pop()
    const baseUrl = baseSrc.replace(`.${extension}`, '')

    const widths = [mobile, tablet, desktop, wide]
    const srcSetEntries = widths.map(width => {
      const optimizedUrl = `${baseUrl}-${width}w.${extension}`
      return `${optimizedUrl} ${width}w`
    })

    return srcSetEntries.join(', ')
  }, [baseSrc, mobile, tablet, desktop, wide])

  const generateSizes = useMemo(() => {
    const sizesArray: string[] = []

    if (mobile) {
      sizesArray.push(`(max-width: 640px) ${mobile}px`)
    }
    if (tablet) {
      sizesArray.push(`(max-width: 768px) ${tablet}px`)
    }
    if (desktop) {
      sizesArray.push(`(max-width: 1024px) ${desktop}px`)
    }
    if (wide) {
      sizesArray.push(`${wide}px`)
    }

    return sizesArray.join(', ')
  }, [mobile, tablet, desktop, wide])

  return {
    srcSet: generateSrcSet,
    sizes: generateSizes,
  }
}

export const getOptimizedImageUrl = (
  src: string,
  params: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'avif' | 'auto'
  } = {}
): string => {
  const { width, height, quality = 80, format = 'auto' } = params

  const url = new URL(src, window.location.origin)

  if (width) url.searchParams.set('w', width.toString())
  if (height) url.searchParams.set('h', height.toString())
  if (quality) url.searchParams.set('q', quality.toString())
  if (format) url.searchParams.set('fm', format)

  return url.toString()
}