import React from "react"
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid"
import { TextField } from "@mui/material"
import { Link } from "react-router-dom"
import { MemberEntity } from "./list.vm"
import { routes } from '../../core/router/routes'
import { useCompanyContext } from "../../core/contexts/company"
import { ColorButton } from "../../common/components/colorButton/colorButton.component"
import "./list.styles.scss"

interface Props {
    members: MemberEntity[]
    inputSearch: string
    setInputSearch: React.Dispatch<React.SetStateAction<string>>
    handleOnClick: () => void,
    handleOnClickBack: () => void
}

export const List: React.FC<Props> = ({ 
    members,
    inputSearch,
    setInputSearch,
    handleOnClick,
    handleOnClickBack
}) => {

    const { name } = useCompanyContext()

    const rows: GridRowsProp = members.map((member) => {
        return {
            avatar: member.avatar_url,
            id: member.id,
            login: member.login,
            member: member
        }
    })
      
    const columns: GridColDef[] = [
        { 
            field: 'avatar',
            headerName: 'Avatar',
            width: 150,
            renderCell: (params) => <img className="avatar-img" src={params.value} /> 
        },
        { 
            field: 'id',
            headerName: 'Id',            
            width: 150,
            renderCell: (params) => <span>{params.value}</span> 
        },
        { 
            field: 'login',
            headerName: 'Name',            
            flex: 1,
            minWidth: 300,
            renderCell: (params) => <Link to={routes.details(params.value)} state={params.row}>{params.value}</Link>

        },
    ]

    return (
        <>
            <h2>List page from {name.toLocaleUpperCase()}</h2>
            <div className="list-user-list-header">
                <div className="list-user-list-header-search">
                    <TextField 
                        className="input-login"
                        id="nameInput" 
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)} 
                        variant="outlined"
                        size="small"
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '4px'
                        }}
                        color="primary"
                    />
                    <ColorButton 
                        type="button"
                        text="Search"
                        handleOnClick={handleOnClick}
                    />
                </div>
                <ColorButton 
                    type="button"
                    text="Back to home"
                    handleOnClick={handleOnClickBack}
                />
            </div>
            <div className="list-user-list-container">
                <DataGrid 
                    rows={rows} 
                    columns={columns} 
                    getRowHeight={() => 'auto'}
                    autoPageSize
                />
            </div>
        </>
    )
}
