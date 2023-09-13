import React from 'react'
import logoList from '../../assets/images/logoLemon.png'
import logoApi from '../../assets/images/logoRicky.webp'
import "./home.styles.scss"

interface Props {
    handleList: () => void
    handleApi: () => void
}

const Home: React.FC<Props> = ({
    handleList,
    handleApi
}) => {
    return (
        <div className="home-container">
            <div className="home-container-item" onClick={handleList}>
                <img src={logoList} />
            </div>
            <div className="home-container-item" onClick={handleApi}>
                <img src={logoApi} />
            </div>
        </div>
    )
}

export default Home