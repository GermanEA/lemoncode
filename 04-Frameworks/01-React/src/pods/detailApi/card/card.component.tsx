import React from 'react'
import { CharacterEntity } from '../../listApi/listApi.vm'
import { Link } from 'react-router-dom'
import './card.styles.scss'

interface Props {
    info: CharacterEntity
}

export const Card: React.FC<Props> = ({ info }) => {
    return (
        
        info &&
            <div className={`card-detailapi-container ${info.status === 'Alive' ? 'status-alive' : 'status-dead'}`}>
                <div className="card-detailapi-container__image">
                    <img src={info.image} />
                </div>
                <div className="card-detailapi-container__info">
                    <div className="card-detailapi-container__info__titles">Name: {info.name}</div>
                    <div className="card-detailapi-container__info__subtitles">Gender: {info.gender}</div>
                    <div className="card-detailapi-container__info__subtitles">Species: {info.species}</div>
                    <div className="card-detailapi-container__info__subtitles">Origin: {info.origin.name}</div>
                    <div className="card-detailapi-container__info__subtitles">Location: {info.location.name}</div>
                    <div className="card-detailapi-container__info__subtitles">Status: {info.status}</div>
                    <div className="card-detailapi-container__info__subtitles">Created: {new Date(info.created).toDateString()}</div>
                    <div className="card-detailapi-container__info__subtitles">URL: {
                        <Link to={info.url} target="_blank" >{info.url}</Link>    
                    }</div>
                </div>
            </div>
        
    )
}