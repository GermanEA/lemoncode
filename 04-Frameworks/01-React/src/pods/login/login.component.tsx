import React from "react"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { ColorButton } from "../../common/components/colorButton/colorButton.component"
import "./login.styles.scss"

interface Props {
    onLogin: (username: string, password: string) => void
}

export const Login: React.FC<Props> = (props) => {
    const { onLogin } = props
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleNavigation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onLogin(username, password)
    }

    return (
        <form className="login-form-container" onSubmit={handleNavigation}>

            <div className="login-form-container__inputs">
                <TextField 
                    className="input-login"
                    id="nameInput" 
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    variant="outlined"
                    size="small"
                    sx={{ 
                        width: '100%',
                    }}
                    color="primary"
                />
                <TextField 
                    className="input-login"
                    id="passInput" 
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined" 
                    size="small"
                    sx={{ 
                        width: '100%',
                    }}
                    color="primary"
                    InputProps={{
                        endAdornment: 
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                    }}
                />
            </div>

            <ColorButton 
                type="submit"
                text="Login"
            />
        </form>
    )
}
