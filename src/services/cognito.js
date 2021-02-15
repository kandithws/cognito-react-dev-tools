const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

/**
 *
 * @param {import('amazon-cognito-identity-js').CognitoUser} cognitoUser
 * @param {import('amazon-cognito-identity-js').AuthenticationDetails} authenticationDetails
 * @returns {import('amazon-cognito-identity-js').CognitoUserSession} session
 */
function authenticateUser(cognitoUser, authenticationDetails) {
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        resolve(result);
      },
      onFailure: function (err) {
        reject(err);
      },
    });
  });
}

class CognitoService {
  constructor(userPoolId, clientId, region = 'ap-southeast-1') {
    (this.userPoolId = userPoolId), (this.clientId = clientId), (this.region = region);

    this.userPool = new AmazonCognitoIdentity.CognitoUserPool({
      UserPoolId: this.userPoolId, // Your user pool id here
      ClientId: this.clientId, // Your client id here
    });
  }

  async login(username, password) {
    try {
      const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
      });

      const userData = {
        Username: username,
        Pool: this.userPool,
      };

      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      const authResult = await authenticateUser(cognitoUser, authenticationDetails);

      const tokens = {};

      tokens.accessToken = authResult.getAccessToken().getJwtToken();
      tokens.idToken = authResult.getIdToken().getJwtToken();
      tokens.refreshToken = authResult.getRefreshToken().getToken();

      return { tokens: tokens, session: authResult };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Fail to authenticate');

      // eslint-disable-next-line no-console
      console.trace(err);

      return {};
    }
  }
}

export default CognitoService;
