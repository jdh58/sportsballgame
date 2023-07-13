import { useState } from 'react';
import Search from '../assets/search.svg';

import '../styles/GuessField.css';

export default function GuessField({ type }: { type: string }) {
  return (
    <div className="guessField">
      <div className="searchIconContainer">
        <img src={Search} alt="" className="searchIcon" />
      </div>
      <input
        type="text"
        name="guess"
        id="guess"
        placeholder="Type your guess..."
        maxLength={50}
      />
    </div>
  );
}
