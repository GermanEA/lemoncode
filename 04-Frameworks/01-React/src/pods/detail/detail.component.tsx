import React from "react"
import { MemberCompleteEntity } from "./detail.vm"
import { ColorButton } from "../../common/components/colorButton/colorButton.component"
import { Card } from "./card"
import './detail.styles.scss'

interface Props {
    member: MemberCompleteEntity,
    handleOnClickBack: () => void
}

export const Detail: React.FC<Props> = ({ 
    member,
    handleOnClickBack 
}) => {

    return (
        <div className="detail-container">
            <Card member={member} />
            <ColorButton 
                type="button"
                text="Back to home"
                handleOnClick={handleOnClickBack}
            />
        </div>
    )
}