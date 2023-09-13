import React from "react"
import { useParams } from "react-router-dom"
import { ContainerApiLayout } from "../layout/containerApi/containerApi.layout"
import DetailApiContainer from "../pods/detailApi/detailApi.container"

export const DetailApiPage: React.FC = () => {
    const {id} = useParams()

    return (
        <ContainerApiLayout>
            <DetailApiContainer id={id} />
        </ContainerApiLayout>
    )
}