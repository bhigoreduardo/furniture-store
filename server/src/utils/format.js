export const filterSorted = (sorted) => {
  switch (sorted) {
    case 'asc':
      return { name: 1 }
    case 'desc':
      return { name: -1 }
    case 'news':
      return { createdAt: -1 }
    case 'old':
      return { createdAt: 1 }
    case 'latest':
      return { updatedAt: -1 }
    case 'sold':
      return { sales: -1 }
    case 'popularity':
      return { 'reviewsAvg.amount': -1 }
    case 'minor-price':
      return { 'rangePrice.min': 1 }
    case 'biggest-price':
      return { 'rangePrice.max': -1 }
    default:
      return { createdAt: -1 }
  }
}
