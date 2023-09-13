import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CharacterEntity } from '../listApi/listApi.vm'
import { DetailApi } from './detailApi.component'
import { routes } from '../../core/router/routes'

interface Props {
    id: string
}

const DetailApiContainer: React.FC<Props> = ({ id }) => {
    const navigate = useNavigate()
    const [info, setInfo] = React.useState<CharacterEntity>()
    const [loading, setLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        setLoading(true)
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then((response) => response.ok ? response.json() : [])
            .then((json) => {
                setInfo(json)
                setLoading(false)
            })
    }

    const handleOnClick = () => {
        navigate(routes.listApi)
    }

    return (
        <DetailApi
            info={info}
            loading={loading}
            handleOnClick={handleOnClick}
        />
    )
}

export default DetailApiContainer