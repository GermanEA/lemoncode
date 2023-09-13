import React from "react"
import { useNavigate } from "react-router-dom"
import { Login } from "./login.component"
import { routes } from "../../core/router/routes"

export const LoginContainer: React.FC = () => {
    const navigate = useNavigate()

    const handleLogin = (username: string, password: string) => {
        if (username === "admin" && password === "test") {
            navigate(routes.home)
        } else {
            alert("User / password not valid, psst... admin / test")
        }
    }

    return (
        <Login onLogin={handleLogin} />
    )
}