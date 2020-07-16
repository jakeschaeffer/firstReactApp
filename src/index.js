import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square components are "controlled components", meaning:
// 1. They do not maintain state
// 2. Receive values from Board component
// 3. Inform the Board component when they're clicked

// Then replaced Square class with "functional component"
// Simpler way to write components that only have render method (no state)
// this.props just becomes props
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    // .slice copies array and edits that as opposed to in place
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares})
  }

  renderSquare(i) {
    return (
      // two props passed from Board to Square
      // onClick prop is f(x) Square can call when clicked
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  
  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
