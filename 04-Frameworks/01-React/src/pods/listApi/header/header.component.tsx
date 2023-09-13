import React from 'react'
import { Pagination, TextField } from '@mui/material'
import { ColorButton } from '../../../common/components/colorButton'
import { ApiInfoResponse } from '../listApi.vm'
import { ApiRMData } from '../../../core/contexts/apiRM/apiRM.vm'
import './header.styles.scss'

interface Props {
    inputSearch: string
    info: ApiInfoResponse
    page: number
    setData: (data: ApiRMData) => void
    handleOnClick: () => void
}

export const Header: React.FC<Props> = ({
    inputSearch,
    info,
    page,
    setData,
    handleOnClick
}) => {
    return (
        <div className="listdetail-header">
            <TextField 
                className="input-login"
                id="nameInput" 
                value={inputSearch}
                onChange={(e) => setData({ page: page, name: e.target.value})} 
                variant="outlined"
                size="small"
                label="Name"
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '4px'
                }}
                color="primary"
            />
            {
                info &&
                    <div className="listdetail-header__pagination">                    
                        <Pagination count={info.pages} page={page} onChange={(e, page) => setData({ page: page, name: inputSearch})}/>
                        <span>Total characters: {info.count}</span>
                    </div>
            }
            <ColorButton 
                type="button"
                text="Back to home"
                handleOnClick={handleOnClick}
            />
        </div>
    )
}