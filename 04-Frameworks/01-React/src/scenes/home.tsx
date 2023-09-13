import React from 'react'
import { ContainerLayout } from '../layout/container/container.layout'
import HomeContainer from '../pods/home/home.container'

export const HomePage: React.FC = () => {
    return (
        <ContainerLayout>
            <HomeContainer />
        </ContainerLayout>
    )
}