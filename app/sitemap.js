import { SITE_URL } from '@/lib/siteConfig'

export const dynamic = 'force-static'

export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
