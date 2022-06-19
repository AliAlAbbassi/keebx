import { useRouter } from 'next/router'

export const useGetIntId = () => {
  const router = useRouter()
  const intId =
    typeof router.query.keebId === 'string' ? parseInt(router.query.keebId) : -1

  return intId
}
