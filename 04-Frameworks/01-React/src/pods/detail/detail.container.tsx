import React from "react"
import { Detail } from "./detail.component"
import { useLocation, useNavigate } from "react-router-dom"
import { routes } from "../../core/router/routes"

interface Props {
    id: string
}

export const DetailContainer: React.FC<Props> = ({ id }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleOnClickBack = () => {
        navigate(routes.list)
    }

    return (
        <Detail 
            member={location.state.member} 
            handleOnClickBack={handleOnClickBack}  
        />
    ) 
}