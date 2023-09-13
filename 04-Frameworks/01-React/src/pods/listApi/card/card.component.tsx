import React from 'react'
import { useNavigate } from 'react-router-dom'
import MaleRoundedIcon from '@mui/icons-material/MaleRounded'
import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded'
import { CharacterEntity } from '../listApi.vm'
import { routes } from '../../../core/router/routes'
import './card.styles.scss'

interface Props {
    character: CharacterEntity
}

export const Card: React.FC<Props> = ({
    character
}) => {
    const navigate = useNavigate()

    return (
        <div 
            key={character.id} 
            className={`card-listapi-container ${character.status === 'Alive' ? 'status-alive' : 'status-dead'}`} 
            onClick={() => navigate(routes.detailsApi(character.id))}
        >
            <div className="card-listapi-container__item">
                <div className="card-listapi-container__item__image-wrapper">
                    <img src={character.image} />
                    <span>{character.gender === 'Male' ? <MaleRoundedIcon fontSize='small' /> : <FemaleRoundedIcon fontSize='small' />}</span>
                </div>
                <div className="card-listapi-container__item__info-wrapper">
                    <span className="character-name">{character.name}</span>
                    <span className="character-date">{new Date(character.created).toDateString()}</span>
                </div>
            </div>
        </div>
    )
}