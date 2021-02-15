import React from 'react';
import TextInput from '../common/TextInput';
import DropDownList from '../common/DropDownList';

const AWS_REGION_OPTIONS = [
  ['ap-southeast-1', 'Singapore (ap-southeast-1)'],
  'us-east-2',
  'us-east-1',
];

class CognitoForm extends React.Component {
  state = { userPoolId: '', clientId: '', region: 'ap-southeast-1' };
  constructor(props) {
    super(props);
    if (!props.onCognitoContextSet && typeof props.onCognitoContextSet !== 'function') {
      throw new Error('Required: props.onCognitoContextSet');
    }
  }

  updateStateField = (fieldName, val) => {
    this.setState((prevState) => {
      const st = Object.assign({}, prevState, { [fieldName]: val });

      return st;
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const cognitoContext = {};
    cognitoContext.userPoolId = this.state.userPoolId;
    cognitoContext.clientId = this.state.clientId;
    cognitoContext.region = this.state.region;

    this.props.onCognitoContextSet(cognitoContext);
  };

  render() {
    return (
      <div className='box'>
        <form className='form' onSubmit={this.onSubmit}>
          <TextInput
            label='User Pool ID'
            value={this.state.userPoolId}
            onChange={(e) => {
              this.updateStateField('userPoolId', e.target.value);
            }}
          />
          <TextInput
            label='Client ID'
            value={this.state.clientId}
            onChange={(e) => {
              this.updateStateField('clientId', e.target.value);
            }}
          />
          <DropDownList
            label='Region'
            options={AWS_REGION_OPTIONS}
            value={this.state.region}
            onChange={(e) => {
              console.log('Selector change:', e.target.value);
              this.updateStateField('region', e.target.value);
            }}
          />

          <button type='submit' className='button is-link'>
            Setup Cognito
          </button>
        </form>
      </div>
    );
  }
}

export default CognitoForm;
