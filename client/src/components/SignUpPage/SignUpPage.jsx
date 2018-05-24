import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const SignUpPage = () => (
  <div className='signup-form'>
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.signup-form {
        height: 100%;
      }
    `}</style>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          {' '}Create an account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Create a Password'
              type='password'
            />
            <Button color='blue' fluid size='large'>Sign Up</Button>
          </Segment>
        </Form>
        <Message>
          Already a member? <Link className='signup' to='/login'>Log In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default SignUpPage;