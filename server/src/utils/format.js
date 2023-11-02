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
    default:
      return { name: 1 }
  }
}
