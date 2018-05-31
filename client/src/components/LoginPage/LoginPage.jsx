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
    this.setState = this.setState.bind(this);
  }

  handleChange = (e, { name, value }) =>  console.log("WHat is this? ", this);
    // this.setState({
    //   [name]: value
    // })


  render() {
    const { email, password } = this.state;

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
            <Form onSubmit={() => this.props.loginUser(this.state.email, this.state.password) } size='large'>
              <Segment stacked>
                <Form.Input
                  label='email'
                  name='email'
                  value={email}
                  onChange={this.handleChange}
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                />
                <Form.Input
                  label='password'
                  name='password'
                  value={password}
                  onChange={this.handleChange}
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
