import React, { useState } from 'react';
import { Card, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import './card.css';


const CardComponent = (props) => {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

   
    const formSubmitted = (event) => {
        event.preventDefault()
        const User = {
            'name': name,
            'message': message,
        }
        props.parentCallBack(User)
        // console.log(User)
    }

    return (
        <div>
            <Card body className="message-form">
                <CardTitle>Welcome to GuestMap !</CardTitle>
                <CardText>Leave a message with your location ! </CardText>
                <Form onSubmit={formSubmitted}>
                    <FormGroup>
                        <Label for="name">name</Label>
                        <Input
                            onChange={e => setName(e.target.value)}
                            type="name"
                            name="name"
                            id="name"
                            placeholder="enter your name" />
                        <Label for="message">message</Label>
                        <Input
                            onChange={e => setMessage(e.target.value)}
                            type="textarea"
                            ame="message"
                            id="message"
                            placeholder="enter a message" />

                    </FormGroup>
                    <Button color="primary" type="submit" disabled={props.haveUsersLocation}>Send</Button>
                </Form>
            </Card>
        </div>
    );
}

export default CardComponent;
