import React, { Component } from 'react';
import HighCharts from 'highcharts';
import { connect } from 'react-redux';
import './PlayerChart.scss';

class PlayerChart extends Component {
  static propTypes = {
    stats: React.PropTypes.shape(),
  }

  static defaultProps = {
    stats: undefined,
  }

  componentDidMount() {
    if (this.props.stats) {
      this.drawChart(this.props.stats);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.stats && nextProps.stats) {
      this.drawChart(nextProps.stats);
    }
  }

  drawChart = (stats) => {
    const lineDrives = Number(stats.BatterLineDrives['#text']);
    const flyBalls = Number(stats.BatterFlyBalls['#text']);
    const grounders = Number(stats.BatterGroundBalls['#text']);

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
  const cumulativeStats = state.players.items[playerId] && state.players.items[playerId].stats;

  return {
    stats: cumulativeStats,
  };
};

export default connect(mapStateToProps)(PlayerChart);
