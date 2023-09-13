import React from 'react'
import { Link } from 'react-router-dom'
import { MemberCompleteEntity } from '../detail.vm'
import './card.styles.scss'

interface Props {
    member: MemberCompleteEntity,
}

export const Card: React.FC<Props> = ({ member }) => {
    return (
        <div className="card">
            <div className="card-header">
                <div className="image-container">
                    <img src={member.avatar_url} />
                </div>
                <h2>User: {member.login}</h2>
            </div>
            <div className="card-details">
                <span>Type: {member.type}</span>
                <span>Admin: {member.site_admin ? 'Si' : 'No'}</span>
                <span>Url: <Link to={member.url} target="_blank">{member.url}</Link></span>
                <span>Repos: <Link to={member.repos_url} target="_blank" >{member.repos_url}</Link></span>
                <span>Followers: <Link to={member.followers_url} target="_blank" >{member.followers_url}</Link></span>
            </div>
        </div>
    )
}