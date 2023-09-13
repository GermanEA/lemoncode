import React from "react"
import { CompanyData } from './company.vm'

const initialCompanyData: CompanyData = {
    name: 'lemoncode'
}

interface Context extends CompanyData {
    setCompanyData: (company: CompanyData) => void
}

export const CompanyContext = React.createContext<Context>({ ...initialCompanyData } as Context)

interface Props {
    children: React.ReactNode
}

export const CompanyProvider: React.FC<Props> = ({ children }) => {
    const [companyData, setCompanyData] = React.useState<CompanyData>(initialCompanyData)

    return (
        <CompanyContext.Provider
            value={{
                name: companyData.name,
                setCompanyData
            }}
        >
            {children}
        </CompanyContext.Provider>
    )
}

export const useCompanyContext = () => {
    return React.useContext(CompanyContext)
}