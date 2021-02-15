import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CopyableText extends React.Component {
  render() {
    return (
      <div>
        <label className='title is-6'>{this.props.label}</label>
        <div className='columns'>
          <div className='column control'>
            <textarea
              className='textarea'
              style={{ backgroundColor: '#B9B9B9' }}
              readOnly={true}
              value={this.props.value}
            />
          </div>
          <CopyToClipboard
            className='column'
            text={this.props.value}
            onCopy={() => {
              this.setState({ copied: true });
            }}
          >
            <span style={{ cursor: 'pointer' }}>
              <i>
                <FontAwesomeIcon icon={faCopy} />
              </i>
            </span>
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}

export default CopyableText;
