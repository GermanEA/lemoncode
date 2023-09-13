import React from "react"
import styled from "@emotion/styled"
import { Button, ButtonProps } from "@mui/material"

interface Props {
    text: string
    type: "button" | "reset" | "submit"
    handleOnClick?: () => void
}

export const ColorButton: React.FC<Props> = ({
    text,
    type,
    handleOnClick
}) => {

    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: '#3d3d3d',
        fontWeight: 'bold',
        backgroundColor: '#e2e23f',
        '&:hover': {
            backgroundColor: '#f5f506',
        },
    }))

    return (
        <ColorButton 
            type={type}
            variant="contained"
            color="success"
            onClick={handleOnClick}
        >{text}</ColorButton>
    )
}