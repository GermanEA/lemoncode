import React from "react"
import { LoginContainer } from "../pods/login"
import { LoginLayout } from "../layout"

export const LoginPage: React.FC = () => {
    return (
        <LoginLayout>
            <LoginContainer />
        </LoginLayout>
    )
}
