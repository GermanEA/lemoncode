import React from "react"
import { useParams } from "react-router-dom"
import { DetailContainer } from "../pods/detail"
import { ContainerLayout } from "../layout/container/container.layout"

export const DetailPage: React.FC = () => {
  const {id} = useParams()

  return (
    <ContainerLayout>
      <DetailContainer id={id} />
    </ContainerLayout>
  )
}
