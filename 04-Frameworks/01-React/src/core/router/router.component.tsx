import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { switchRoutes } from "./routes"
import { LoginPage, ListPage, DetailPage, HomePage, ListApiPage, DetailApiPage } from "../../scenes"

export const RouterComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path={switchRoutes.root} element={<LoginPage />} />
                <Route path={switchRoutes.home} element={<HomePage />} />
                <Route path={switchRoutes.list} element={<ListPage />} />
                <Route path={switchRoutes.details} element={<DetailPage />} />
                <Route path={switchRoutes.listApi} element={<ListApiPage />} />
                <Route path={switchRoutes.detailsApi} element={<DetailApiPage />} />
            </Routes>
        </Router>
    )
}
