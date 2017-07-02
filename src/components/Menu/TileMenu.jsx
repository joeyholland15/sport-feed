import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './TileMenu.scss';
import { logos } from '../../constants/logosByTeam';

/*
  The idea of this component is to be a side panel menu that acts as a grid.
  A good example use case is to organize division standings. Options prop is
  an array of arrays (rows and columns matrix)
*/

const ABBREVIATIONS = {
  'American League/East': 'AL East',
  'American League/Central': 'AL Central',
  'American League/West': 'AL West',
  'National League/East': 'NL East',
  'National League/Central': 'NL Central',
  'National League/West': 'NL West',
};

const TileMenu = ({
  categories, // i.e. AL West, etc.
  label, // i.e. "Divisions"
  headers, // i.e. 1st, 2nd, etc.
  onClick,
  selected,
}) => (
  <div className="tile-menu">
    <div className="tile-menu-row-header">
      <div className="tile-menu-title">{label}</div>
      {headers.map(header => (
        <div key={header} className="tile-menu-cell">{header}</div>
      ))}
    </div>
    {categories && Object.keys(categories).map((category) => {
      const row = categories[category];
      return (
        <div key={category}>
          <div className="tile-menu-row">
            <div className="tile-menu-title">{ABBREVIATIONS[category]}</div>
            {Object.keys(row).map((option) => {
              const team = row[option];
              const wins = team.stats.Wins['#text'];
              const losses = team.stats.Losses['#text'];
              return (
                <div
                  key={team.team.Abbreviation}
                  className="tile-menu-cell"
                  style={{
                    backgroundImage: `url(${logos[team.team.Abbreviation]})`,
                  }}
                  onClick={() => { onClick(option.name); }}
                >
                  {option.image ? '' : option.name}
                  <div className="overlay">{`${wins}-${losses}`}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    })}
  </div>
);

export default TileMenu;
