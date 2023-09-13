import React from "react"
import { ContainerApiLayout } from "../layout/containerApi/containerApi.layout"
import { ListApiContainer } from "../pods/listApi"

export const ListApiPage: React.FC = () => {
    return (
        <ContainerApiLayout>
            <ListApiContainer />
        </ContainerApiLayout>
    )
}
