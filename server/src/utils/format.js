import { FilterEnum } from '../types/filter.type.js'

export const filterSorted = (sorted) => {
  switch (sorted) {
    case FilterEnum.ASC:
      return { name: 1 }
    case FilterEnum.DESC:
      return { name: -1 }
    case FilterEnum.NEWS:
      return { createdAt: -1 }
    case FilterEnum.OLD:
      return { createdAt: 1 }
    case FilterEnum.LATEST:
      return { updatedAt: -1 }
    case FilterEnum.SOLD:
      return { sales: -1 }
    case FilterEnum.POPULARITY:
      return { 'reviewsAvg.amount': -1 }
    case FilterEnum.MINORPRICE:
      return { 'rangePrice.min': 1 }
    case FilterEnum.BIGGESTPRICE:
      return { 'rangePrice.max': -1 }
    default:
      return { createdAt: -1 }
  }
}
