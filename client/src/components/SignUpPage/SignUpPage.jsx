import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value
    })
  }


  render() {
    return (
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
            <Form onSubmit={() => this.props.signUpUser(this.state.email, this.state.password)} size='large'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  name='email'
                  value={this.state.email}
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Create a Password'
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Button content='Sign up' color='blue' fluid size='large' />
              </Segment>
            </Form>
            <Message>
              Already a member? <Link className='signup' to='/login'>Log In</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}


export default SignUpPage;