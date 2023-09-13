import React from 'react'
import { CharacterEntity } from '../listApi/listApi.vm'
import { Card } from './card'
import { ColorButton } from '../../common/components/colorButton'
import { Spinner } from '../../common/components/spinner'
import './detailApi.styles.scss'

interface Props {
    info: CharacterEntity
    loading: boolean
    handleOnClick: () => void
}

export const DetailApi: React.FC<Props> = ({ 
    info, 
    loading, 
    handleOnClick 
}) => {
    return (
        <div className="detailapi-container">
            {
                loading
                    ? <Spinner />
                    : <>
                        <Card info={info} />
                        <ColorButton 
                            type="button"
                            text="Back to list"
                            handleOnClick={handleOnClick}
                        />
                    </>
            }
        </div>
    )
}