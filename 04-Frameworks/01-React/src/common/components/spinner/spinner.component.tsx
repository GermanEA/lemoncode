import React from 'react'
import { CircularProgress } from '@mui/material'
import './spinner.styles.scss'

export const Spinner = () => {
    return (
        <div className="spinner-container"><CircularProgress /></div>
    )
}