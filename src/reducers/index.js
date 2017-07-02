import { combineReducers } from 'redux';
import HitterReducer from './HitterReducer';
import PitcherReducer from './PitcherReducer';
import FilterReducer from './FilterReducer';
import LineupReducer from './LineupReducer';
import DateReducer from './DateReducer';
import ScoreboardReducer from './ScoreboardReducer';
import DailyFantasyReducer from './DailyFantasyReducer';
import GameReducer from './GameReducer';
import BoxScoreReducer from './BoxScoreReducer';
import GameLineupReducer from './GameLineupReducer';
import ResearchReducer from './ResearchReducer';
import PlayerReducer from './PlayerReducer';
import LeagueReducer from './LeagueReducer';
import InjuryReducer from './InjuryReducer';

const rootReducer = combineReducers({
  hitters: HitterReducer,
  pitchers: PitcherReducer,
  filters: FilterReducer,
  lineup: LineupReducer,
  date: DateReducer,
  scoreboard: ScoreboardReducer,
  dailyFantasy: DailyFantasyReducer,
  games: GameReducer,
  boxScores: BoxScoreReducer,
  gameLineups: GameLineupReducer,
  research: ResearchReducer,
  players: PlayerReducer,
  league: LeagueReducer,
  injuries: InjuryReducer,
});

export default rootReducer;
