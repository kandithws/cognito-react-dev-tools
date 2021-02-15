import React from 'react';
import CognitoForm from '../CognitoForm';
import LoginForm from '../LoginForm';
import CognitoService from '../../services/cognito';
import CopyableText from '../common/CopyableText';

class App extends React.Component {
  state = {
    cognitoContext: { userPoolId: '', clientId: '', region: '' },
    cognitoService: null,
    cognitoSession: null,
    tokens: { accessToken: '', idToken: '', refreshToken: '' },
  };

  onCognitoContextSet = (ctx) => {
    // TODO -- loading screen
    const { userPoolId, clientId, region } = ctx;

    this.state.cognitoContext.userPoolId = ctx.userPoolId;
    this.state.cognitoContext.clientId = ctx.clientId;
    this.state.cognitoContext.region = ctx.region;

    this.setState({
      userPoolId: ctx.userPoolId,
      clientId: ctx.clientId,
      region: ctx.region,
    });

    this.state.cognitoService = new CognitoService(userPoolId, clientId, region);
  };

  onLoginSubmit = async ({ username, password }) => {
    // TODO -- ADD validation if cognito service not set
    const { tokens, session } = await this.state.cognitoService.login(username, password);
    this.setState({
      cognitoSession: session,
      tokens: tokens,
    });
  };

  render() {
    return (
      <div className='container mt-5'>
        <h1 className='title is-1'>AWS Cognito Login Dev Tools</h1>
        <div className='container mb-5'>
          <CognitoForm onCognitoContextSet={this.onCognitoContextSet} />
        </div>
        <div className='container mb-5'>
          <LoginForm onSubmit={this.onLoginSubmit} />
        </div>
        <div className='container mt-5'>
          <div className='box'>
            <p className='title is-4'>Results </p>
            <CopyableText label='Access Token' value={this.state.tokens.accessToken} />
            <CopyableText label='ID Token' value={this.state.tokens.idToken} />
            <CopyableText label='Refresh Token' value={this.state.tokens.refreshToken} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
