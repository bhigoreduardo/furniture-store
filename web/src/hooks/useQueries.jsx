import { useLocation } from 'react-router-dom'

export default function useQueries() {
  return new URLSearchParams(useLocation().search)
}
