import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import styles from './GameModal.scss';
import { logos } from '../../constants/logosByTeam';
import GameModalStats from './GameModalStats';
import { makeDateNoPretty } from '../../constants/date';

class GameModal extends Component {
  render() {
    const styles = {
      content: {
        width: '50vw',
        height: '50vh',
        margin: '0 auto',
        top: '20%', // not perfect
      },
    };

    const {
      box,
      date,
      awayBattingOrder,
      homeBattingOrder,
      awayPitcherId,
      homePitcherId,
    } = this.props;

    return (
      <Modal
        {...this.props}
        contentLabel="Content label"
        style={styles}
      >
        {box && (
          <div>
            <div className="game-date">{makeDateNoPretty(date)}</div>
            <div className="box-score-container">
              <div className="team">
                <div className="header">
                  <div>
                    <img alt="" src={`${logos[box.game.awayTeam.Abbreviation]}`} />
                  </div>
                  <div style={{ flex: 4 }}>{`${box.game.awayTeam.City} ${box.game.awayTeam.Name}`}</div>
                  <div>{`${box.awayTeam.awayTeamStats.Runs['#text']}`}</div>
                </div>
                <GameModalStats
                  gameId={this.props.gameId}
                  battingOrder={awayBattingOrder}
                  date={date}
                  pitcherId={awayPitcherId}
                />
              </div>
              <div className="team">
                <div className="header">
                  <div>
                    <img alt="" src={`${logos[box.game.homeTeam.Abbreviation]}`} />
                  </div>
                  <div style={{ flex: 4 }}>{`${box.game.homeTeam.City} ${box.game.homeTeam.Name}`}</div>
                  <div>{`${box.homeTeam.homeTeamStats.Runs['#text']}`}</div>
                </div>
                <GameModalStats
                  gameId={this.props.gameId}
                  battingOrder={homeBattingOrder}
                  date={date}
                  pitcherId={homePitcherId}
                />
              </div>
            </div>
          </div>
        )}
        {!box && (
          <div>Loading, son</div>
        )}
      </Modal>
    );
  }
}

const mapStateToProps = (state, { gameId }) => {
  const box = gameId && state.boxScores.items[gameId.split('-')[1]];
  const date = box && box.game.date.split('-').join('');

  const awayTeam = box && box.game.awayTeam.Abbreviation;
  const homeTeam = box && box.game.homeTeam.Abbreviation;

  const awayBattingOrder = box && state.gameLineups.items[`${awayTeam}-${gameId.split('-')[1]}`] &&
    state.gameLineups.items[`${awayTeam}-${gameId.split('-')[1]}`].slice(0, 9);

  const homeBattingOrder = box && state.gameLineups.items[`${homeTeam}-${gameId.split('-')[1]}`] &&
    state.gameLineups.items[`${homeTeam}-${gameId.split('-')[1]}`].slice(0, 9);

  const awayPitcher = box && box.awayTeam.awayPlayers.playerEntry
    .find(player => player.player.Position === 'P' && !!state.dailyFantasy.items[`${player.player.ID}-${date}`]);

  const homePitcher = box && box.homeTeam.homePlayers.playerEntry
    .find(player => player.player.Position === 'P' && !!state.dailyFantasy.items[`${player.player.ID}-${date}`]);

  return {
    box,
    date,
    awayBattingOrder,
    homeBattingOrder,
    awayPitcherId: awayPitcher && awayPitcher.player.ID,
    homePitcherId: homePitcher && homePitcher.player.ID,
  };
};

export default connect(mapStateToProps)(GameModal);
