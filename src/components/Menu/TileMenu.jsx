import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './TileMenu.scss';

/*
  The idea of this component is to be a side panel menu that acts as a grid.
  A good example use case is to organize division standings. Options prop is
  an array of arrays (rows and columns matrix)
*/

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
    {Object.keys(categories).map((category) => {
      const row = categories[category];
      return (
        <div key={category}>
          <div className="tile-menu-row">
            <div className="tile-menu-title">{category}</div>
            {row.map(option => (
              <div
                key={option.name}
                className="tile-menu-cell"
                style={{
                  backgroundImage: `url(${option.image})`,
                }}
                onClick={() => { onClick(option.name); }}
              >
                {option.image ? '' : option.name}
                <div className="overlay" />
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

export default TileMenu;
