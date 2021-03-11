import React from 'react';
import { Container, Header } from 'semantic-ui-react'

const Lorem = () => {
    return (
        <div>
            <Header style={{ marginBottom: 40 }} as='h2' color='orange' textAlign='center'>
                Lorem Ipsum
                </Header>
            <Container textAlign="justified">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Container>
        </div>
    )
}

export default Lorem;