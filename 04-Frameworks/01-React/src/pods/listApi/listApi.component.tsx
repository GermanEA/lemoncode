import React from 'react'
import { ApiInfoResponse, CharacterEntity } from './listApi.vm'
import { Card } from './card'
import { Header } from './header'
import { Spinner } from '../../common/components/spinner'
import { ApiRMData } from '../../core/contexts/apiRM/apiRM.vm'
import './listApi.styles.scss'

interface Props {
    characters: CharacterEntity[]
    info: ApiInfoResponse
    page: number
    loading: boolean
    inputSearch: string
    setData: (data: ApiRMData) => void
    handleOnClick: () => void
}

export const ListApi: React.FC<Props> = ({
    characters,
    info,
    page,
    loading,
    inputSearch,
    setData,
    handleOnClick
}) => {
    
    return (
        <>
            <Header 
                inputSearch={inputSearch}
                info={info}
                page={page}
                setData={setData}
                handleOnClick={handleOnClick}
            />
            
            {
                loading 
                    ? <Spinner />
                    : <div className="listapi-wrapper">
                        {
                            characters.length > 0 
                                ? characters.map((character) => (
                                    <Card key={character.id} character={character}/>
                                ))
                                : <span>No hay datos sobre ese personaje</span>
                        }       
                    </div> 
            }    
        </>
    )
}