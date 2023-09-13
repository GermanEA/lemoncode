import React from "react"
import "./login.styles.scss"

interface Props {
    children: React.ReactNode
}

export const LoginLayout: React.FC<Props> = ({ children }) => (
    <div className="login-layout">{children}</div>
)