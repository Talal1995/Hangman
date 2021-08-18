import React, { Component } from "react";
import { randomWord } from "./words";

import start from "./images/start.png";
import GussedWrong1 from "./images/Hangman1.png";
import GussedWrong2 from "./images/Hangman2.png";
import GussedWrong3 from "./images/Hangman3.png";
import GussedWrong4 from "./images/Hangman4.png";
import GussedWrong5 from "./images/Hangman5.png";
import GussedWrong6 from "./images/Hangman6.png";

let gameStat;
class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [start, GussedWrong1, GussedWrong2, GussedWrong3, GussedWrong4, GussedWrong5, GussedWrong6],
  };

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set(),
      answer: randomWord(),
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.keyPress = this.keyPress.bind(this);
    window.addEventListener("keydown", this.keyPress);
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map((bingo) => (this.state.guessed.has(bingo) ? bingo : "_"));
  }

  /** Here it check if the user's guess is true or false!
   *
   */
  handleGuess(value) {
    let letter = value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1),
    }));
  }

  keyPress(event) {
    if (gameStat === "YOU WON" || gameStat === "YOU LOST") {
        this.resetButton();
    }
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <button
        key={letter}
        value={letter}
        onClick={(e) => this.handleGuess(e.target.value)}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  };

  render() {
    const { mistake, answer } = this.state;
    const { maxWrong, images } = this.props;
    const gameOver = mistake >= maxWrong;
    const altText = `${mistake}/${maxWrong} wrong guesses`;
    const isWinner = this.guessedWord().join("") === answer;
    gameStat = this.generateButtons();
   // Check for win
    if (isWinner) {
      gameStat = "CONGRATULATIONS! YOU WON";
    }
     // Check for lose
    if (gameOver) {
      gameStat = "SORRY! YOU LOST";
    }

    return (
      <div className="Hangman">
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand text-light" href="/">
            GetAccept. <small>Hangman</small>
          </a>
          <span className="d-xl-none d-lg-none text-primary">
            Guessed wrong: {mistake}
          </span>
          <button
            className="navbar-toggler sr-only"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item "></li>
              <li className="nav-item"></li>
              <li className="nav-item"></li>
            </ul>
            <span className="navbar-text text-primary">
              Guessed wrong: {mistake}
            </span>
          </div>
        </nav>
        <p className="text-center">
          <img src={images[mistake]} alt={altText} />
        </p>
        <p className="text-center text-light">
          Guess the Animal?
        </p>
        <p className="Hangman-word text-center">
          {!gameOver ? this.guessedWord() : answer}{" "}
        </p>

        <p className="text-center text-warning mt-4">{gameStat}</p>

        <div>
          <p className="text-center">
            <button className="Hangman-reset" onClick={this.resetButton}>
              Restart
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Hangman;