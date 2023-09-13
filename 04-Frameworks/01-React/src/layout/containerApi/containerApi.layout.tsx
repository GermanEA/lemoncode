import React from "react"
import "./containerApi.styles.scss"

interface Props {
    children: React.ReactNode;
}

export const ContainerApiLayout: React.FC<Props> = ({ children }) => (
    <div className="container-api-layout">{children}</div>
)