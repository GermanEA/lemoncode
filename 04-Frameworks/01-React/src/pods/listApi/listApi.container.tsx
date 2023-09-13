import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ListApi } from './listApi.component'
import { ApiInfoResponse, CharacterEntity } from './listApi.vm'
import { useDebounce } from '../../core/hooks'
import { routes } from '../../core/router/routes'
import { useApiRMContext } from '../../core/contexts/apiRM'

export const ListApiContainer: React.FC = () => {
    const navigate = useNavigate()
    const {name, page, setData} = useApiRMContext()
    const [info, setInfo] = React.useState<ApiInfoResponse>()
    const [characters, setCharacters] = React.useState<CharacterEntity[]>([])
    const [loading, setLoading] = React.useState<boolean>(false)
    const param = useDebounce(name, 1000)

    React.useEffect(() => {
        getDataPagination()
    }, [param, page])

    const getDataPagination = () => {
        setLoading(true)
        
        fetch(`https://rickandmortyapi.com/api/character/?page=${page}${param ? `&name=${param}` : ''}`)
            .then((response) => response.ok ? response.json() : { info: {}, results: [] })
            .then((json) => {
                setInfo(json.info)
                setCharacters(json.results)
                setLoading(false)
            })
    }

    const handleOnClick = () => {
        navigate(routes.home)
    }

    return (
        <ListApi
            info={info}
            page={page}
            characters={characters}
            loading={loading} 
            inputSearch={name}
            setData={setData}
            handleOnClick={handleOnClick}
        />
    )
}