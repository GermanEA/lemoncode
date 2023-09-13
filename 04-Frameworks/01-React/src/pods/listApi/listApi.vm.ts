export interface ApiInfoResponse {
    count: number
    next: string
    pages: number
    prev: string
}

export interface CharacterEntity {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: OriginEntity
    location: LocationEntity
    image: string
    episode: string[]
    url: string,
    created: string
}

interface OriginEntity {
    name: string
    url: string
}

interface LocationEntity {
    name: string
    url: string
}