import { generatePath } from "react-router-dom"

interface SwitchRoutes {
    root: string
    list: string
    details: string
    home: string
    listApi: string
    detailsApi: string
}

export const switchRoutes: SwitchRoutes = {
    root: "/",
    list: "/list",
    details: "/detail/:id",
    home: "/home",
    listApi: "/listApi",
    detailsApi: "/detailApi/:id"
}

interface Routes {
    root: string
    list: string
    home: string
    listApi: string
    details: (id: string) => string
    detailsApi: (id: number) => string
}

export const routes: Routes = {
    ...switchRoutes,
    details: (id) => generatePath(switchRoutes.details, { id }),
    detailsApi: (id) => generatePath(switchRoutes.detailsApi, { id }),
}