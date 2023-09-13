import React from "react"
import { RouterComponent } from "./core/router"
import { CompanyProvider } from "./core/contexts/company"
import { ApiRMProvider } from "./core/contexts/apiRM"

export const App = () => {
    return (
        <CompanyProvider>
            <ApiRMProvider>
                <RouterComponent />
            </ApiRMProvider>
        </CompanyProvider>
    )
}
