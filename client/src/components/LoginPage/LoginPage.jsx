import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'



class LoginPage extends React.Component {
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
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
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
              {' '}Log-in to your account
            </Header>
            <Form
            onSubmit={() => this.props.loginUser(this.state.email, this.state.password, this.props.history) }
            size='large'>
              <Segment stacked>
                <Form.Input
                  name='email'
                  value={this.state.email}
                  onChange={this.handleChange.bind(this)}
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                />
                <Form.Input
                  name='password'
                  value={this.state.password}
                  onChange={this.handleChange.bind(this)}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                <Form.Button content='Login' color='blue' fluid size='large' />
              </Segment>
            </Form>
            <Message>
              New to us? <Link className='signup' to='/signup'>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
};

export default LoginPage
