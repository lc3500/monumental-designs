import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/contact/api/'],
    },
    sitemap: 'https://monumentaldesigns.net/sitemap.xml',
  }
}
