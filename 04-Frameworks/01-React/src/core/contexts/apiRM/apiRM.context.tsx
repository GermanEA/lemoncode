import React from "react"
import { ApiRMData } from './apiRM.vm'

const initialData: ApiRMData = {
    name: '',
    page: 1
}

interface Context extends ApiRMData {
    setData: (data: ApiRMData) => void
}

export const ApiRMContext = React.createContext<Context>({ ...initialData } as Context)

interface Props {
    children: React.ReactNode
}

export const ApiRMProvider: React.FC<Props> = ({ children }) => {
    const [data, setData] = React.useState<ApiRMData>(initialData)

    React.useEffect(() => {
        data.name && setData({ ...data, page: 1})
    }, [data.name])

    return (
        <ApiRMContext.Provider
            value={{
                name: data.name,
                page: data.page,
                setData
            }}
        >
            {children}
        </ApiRMContext.Provider>
    )
}

export const useApiRMContext = () => {
    return React.useContext(ApiRMContext)
}