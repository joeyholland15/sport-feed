import React from 'react';
import { connect } from 'react-redux';
import { fetchInjuries } from '../../actions/InjuryActions';

export class InjuriesContainer extends React.Component {
  static propTypes = {
    fetchInjuries: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired,
    injuries: React.PropTypes.bool,
  }

  static defaultProps = {
    injuries: true,
  }

  componentDidMount() {
    if (!this.props.injuries) {
      this.props.fetchInjuries();
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = state => ({
  injuries: Object.keys(state.injuries.items).length > 0,
});

export default connect(mapStateToProps, { fetchInjuries })(InjuriesContainer);
