export function buildLocalBusinessSchema(content) {
  const { logo } = content.sections.nav
  const { phone, email, address } = content.sections.contact
  const { rating } = content.sections.trust

  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: logo,
    description: content.meta.description,
    image: content.meta.ogImage,
    telephone: phone,
    email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: address,
    },
    priceRange: content.meta.priceRange,
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '19:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '16:00' },
    ],
    aggregateRating: rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: rating.score,
          reviewCount: rating.count,
        }
      : undefined,
    url: typeof window !== 'undefined' ? window.location.origin : undefined,
  }
}
