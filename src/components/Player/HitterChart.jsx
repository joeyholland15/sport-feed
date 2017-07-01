import React, { Component } from 'react';
import HighCharts from 'highcharts';
import { connect } from 'react-redux';
import './HitterChart.scss';

class HitterChart extends Component {
  static propTypes = {
    stats: React.PropTypes.shape(),
  }

  static defaultProps = {
    stats: undefined,
    position: undefined,
  }

  componentDidMount() {
    if (this.props.stats) {
      this.drawChart(this.props.stats);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.stats && nextProps.stats) {
      this.drawChart(nextProps.stats, nextProps.position);
    }
  }

  drawChart = (stats, position) => {
    let lineDrives;
    let flyBalls;
    let grounders;

    if (position === 'P') {
      lineDrives = Number(stats.PitcherLineDrives['#text']);
      flyBalls = Number(stats.PitcherFlyBalls['#text']);
      grounders = Number(stats.PitcherGroundBalls['#text']);
    } else {
      lineDrives = Number(stats.BatterLineDrives['#text']);
      flyBalls = Number(stats.BatterFlyBalls['#text']);
      grounders = Number(stats.BatterGroundBalls['#text']);
    }

    this.chart = new HighCharts.Chart(
      'chart-container',
      {
        chart: {
          margin: 0,
        },
        title: {
          text: 'Batter<br>Breakdown',
          align: 'center',
          verticalAlign: 'middle',
          y: 50,
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              distance: -50,
              style: {
                fontWeight: 'bold',
                color: 'white',
              },
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
          },
        },
        series: [{
          type: 'pie',
          innerSize: '50%',
          data: [
            ['Grounders', grounders],
            ['Line Drives', lineDrives],
            ['Fly Balls', flyBalls],
          ],
        }],
      },
    );
  }

  render() {
    return (
      <div id="chart-container" />
    );
  }
}

const mapStateToProps = (state, { playerId }) => {
  const player = state.players.items[playerId];

  const stats = player && player.stats;
  const position = player && player.player && player.player.Position;

  return {
    stats,
    position,
  };
};

export default connect(mapStateToProps)(HitterChart);
