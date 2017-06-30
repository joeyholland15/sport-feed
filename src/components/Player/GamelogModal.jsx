import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import './GamelogModal.scss';
import { makeDateNoPretty } from '../../constants/date';

class GamelogModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        contentLabel="Content label"
      >
        <div>Test</div>
      </Modal>
    );
  }
}

const mapStateToProps = (state, { gameId }) => {
  return {};
};

export default connect(mapStateToProps)(GamelogModal);
