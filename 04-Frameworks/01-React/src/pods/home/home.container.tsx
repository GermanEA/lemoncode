import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../core/router/routes'
import Home from './home.component'

const HomeContainer = () => {
    const navigate = useNavigate()

    const handleList = () => {
        navigate(routes.list)
    }

    const handleApi = () => {
        navigate(routes.listApi)
    }
    
    return (
        <Home 
            handleList={handleList}
            handleApi={handleApi}
        />
    )
}

export default HomeContainer