import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// useParams() hook is used to grab the ID from the
// URL and useNavigate() allows you to navigate back to the UserList after adding or saving a user
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const UserEdit = () => {
    const initialFormState = {
        name: '',
        lastname: '',
        occupation: ''
    };
    const [user, setUser] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            fetch(`/api/user/${id}`)
                .then(response => response.json())
                .then(data => setUser(data));
        }
    }, [id, setUser]);

    const handleChange = (event) => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch(`/api/user${user.id ? `/${user.id}` : ''}`, {
            method: (user.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        setUser(initialFormState);
        navigate('/users');
    }

    const title = <h2>{user.id ? 'Edit item' : 'Add new item'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={user.name || ''}
                               onChange={handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Lastname</Label>
                        <Input type="text" name="lastname" id="lastname" value={user.lastname || ''}
                               onChange={handleChange} autoComplete="address-level1"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="occupation">Occupation</Label>
                        <Input type="text" name="occupation" id="occupation" value={user.occupation || ''}
                               onChange={handleChange} autoComplete="address-level1"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/users">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default UserEdit;