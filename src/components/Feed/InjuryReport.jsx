import React, { Component } from 'react';
import { connect } from 'react-redux';
import InjuriesContainer from '../Containers/InjuriesContainer';
import Injury from './Injury';
import { hitterInjurySelector } from '../../selectors/HitterSelector';
import './InjuryReport.scss';

class InjuryReport extends Component {
  static propTypes = {
    injuries: React.PropTypes.arrayOf(React.PropTypes.string),
  }

  static defaultProps = {
    injuries: undefined,
  }

  render() {
    return (
      <InjuriesContainer>
        <div className="injuries-container">
          <h4>Disabled List</h4>
          <div className="injuries">
            {this.props.injuries && this.props.injuries.map(playerId => (
              <Injury key={playerId} playerId={playerId} />
            ))}
          </div>
        </div>
      </InjuriesContainer>
    );
  }
}

const mapStateToProps = state => ({
  injuries: hitterInjurySelector(state),
});

export default connect(mapStateToProps)(InjuryReport);
