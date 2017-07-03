import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import DfsContainer from '../Containers/DfsContainer';
import MatchupHitter from './MatchupHitter';
import MatchupPitcher from './MatchupPitcher';
import PlaybyPlayContainer from '../Containers/PlaybyPlayContainer';
import { makeDateNoPretty } from '../../constants/date';
import './GamelogMatchup.scss';

class GamelogMatchup extends Component {
  static propTypes = {
    gameId: React.PropTypes.string.isRequired,
    dfs: React.PropTypes.shape(),
    player: React.PropTypes.shape(),
    pitcher: React.PropTypes.shape(),
    isOpen: React.PropTypes.bool.isRequired,
  }

  static defaultProps = {
    dfs: undefined,
    player: undefined,
    pitcher: undefined,
  }

  render() {
    const styles = {
      content: {
        width: '50vw',
        height: '50vh',
        margin: '0 auto',
        top: '20%', // not perfect
      },
    };

    if (!this.props.isOpen) {
      return null;
    }

    const {
      dfs,
      player,
      date,
      pitcher,
      hitterAtBats,
    } = this.props;

    return (
      <PlaybyPlayContainer gameId={this.props.gameId}>
        <DfsContainer date={date}>
          <Modal
            {...this.props}
            contentLabel="Content label"
            style={styles}
          >
            <div>
              <div className="matchup-date">
                {makeDateNoPretty(date)}
              </div>
              <div className="matchups">
                {dfs && dfs.player && (
                  <MatchupHitter
                    player={dfs}
                    atBats={hitterAtBats}
                  />
                )}
                {pitcher && <MatchupPitcher
                  player={pitcher}
                  date={date}
                />}
              </div>
            </div>
          </Modal>
        </DfsContainer>
      </PlaybyPlayContainer>
    );
  }
}

const mapStateToProps = (state, { playerId, date, gameId }) => {
  const dfs = state.dailyFantasy.items[`${playerId}-${date}`];
  const teamId = dfs && dfs.team.ID;

  const playbyplay = state.gameLineups.items[gameId];
  const atBats = playbyplay && playbyplay.atBats;

  const atBatWithPitcher = atBats && atBats.find(item => item.battingTeam.ID === teamId);
  const objectWithPitcher = atBatWithPitcher && atBatWithPitcher.atBatPlay.find(item => item.pitch);
  const pitcherId = objectWithPitcher && objectWithPitcher.pitch.pitchingPlayer.ID;
  const pitcherThrows = objectWithPitcher && objectWithPitcher.pitch.throwingLeftOrRight;

  // get just batter info for each atbat
  const batterObjects = atBats && atBats.map(item => item.atBatPlay[0].batterUp);
  const hitterAtBats = batterObjects &&
    batterObjects.filter(item => item.battingPlayer.ID === playerId);
  const bats = hitterAtBats && hitterAtBats[0] && hitterAtBats[0].standingLeftOrRight;

  const pitcherDfs = state.dailyFantasy.items[`${pitcherId}-${date}`];

  return {
    dfs: {
      ...dfs,
      bats: bats === 'right' ? 'R' : 'L',
    },
    player: state.players.items[playerId],
    hitterAtBats,
    pitcher: {
      ...pitcherDfs,
      throws: pitcherThrows === 'right' ? 'R' : 'L',
    },
  };
};

export default connect(mapStateToProps)(GamelogMatchup);
