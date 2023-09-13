import React from "react"
import { ListContainer } from "../pods/list"
import { ContainerLayout } from "../layout/container/container.layout"

export const ListPage: React.FC = () => {
    return (
        <ContainerLayout>
            <ListContainer />
        </ContainerLayout>
    )
}
