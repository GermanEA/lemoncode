import React from "react"
import "./container.styles.scss"

interface Props {
    children: React.ReactNode;
}

export const ContainerLayout: React.FC<Props> = ({ children }) => (
    <div className="container-layout">{children}</div>
)