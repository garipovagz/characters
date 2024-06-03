import { useQuery } from '@tanstack/vue-query'

export const BASE_URL = 'https://rickandmortyapi.com/api/character'

export interface IData {
  info: {
    count: number
    pages: number
    next: string
    prev: string
  }
  results: {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: { name: string; url: string }
    location: { name: string; url: string }
    image: string
    episode: string[]
    url: string
    created: string
  }[]
}

export const useGetData = (params: { page: number }) => {
  const query = useQuery({
    queryKey: ['characters', params],
    queryFn: async () => {
      return await fetch(BASE_URL + '/?page=' + params.page).then((response) =>
        response.json()
      )
    },
  })
  return {
    ...query,
    characters: computed(() => {
      const data = unref(query.data) as IData
      return data?.results?.map((item) => {
        return {
          id: item.id,
          name: item.name,
          status: item.status,
          species: item.species,
          imageUrl: item.image,
          location: item.location.name,
          firstEpisode: item.episode[0],
        }
      })
    }),
    total: computed(() => {
      const data = unref(query.data) as IData
      return data?.info?.count ?? 0
    }),
  }
}
