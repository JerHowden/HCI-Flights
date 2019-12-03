import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const CardExampleCard = (props) => (
    <Card>
        <Image src={props.image} wrapped ui={false} />
        <Card.Content>
        <Card.Header>{props.title}</Card.Header>
            <Card.Meta>
            <span className='date'>{props.date}</span>
            </Card.Meta>
            <Card.Description>
                {props.description}
            </Card.Description>
        </Card.Content>
    </Card>
)

export default CardExampleCard