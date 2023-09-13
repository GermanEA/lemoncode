import React from "react"
import { useNavigate } from "react-router-dom"
import { MemberEntity } from "./list.vm"
import { List } from "./list.component"
import { useCompanyContext } from "../../core/contexts/company"
import { routes } from "../../core/router/routes"

export const ListContainer: React.FC = () => {
    const navigate = useNavigate()
    const { name, setCompanyData } = useCompanyContext()
    const [members, setMembers] = React.useState<MemberEntity[]>([])
    const [inputSearch, setInputSearch] = React.useState<string>(name)

    React.useEffect(() => {
        handleOnClick()
    }, [])

    const handleOnClick = () => {
        setCompanyData({ name: inputSearch})
        fetch(`https://api.github.com/orgs/${inputSearch}/members`)
            .then((response) => response.ok ? response.json() : [])
            .then((json) => setMembers(json))
    }

    const handleOnClickBack = () => {
        setCompanyData({ name: inputSearch})
        navigate(routes.home)
    }

    return (
        <List 
            members={members}
            inputSearch={inputSearch}
            setInputSearch={setInputSearch}
            handleOnClick={handleOnClick}
            handleOnClickBack={handleOnClickBack}
        />
    )
}
