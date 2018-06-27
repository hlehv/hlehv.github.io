import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let randomNumberBetween = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: 'start'
        }
        
    }
    render(){
        return (
            <div className="game">
                <h1 className="h1"><span style={{color: 'pink'}}> Co</span><span style={{color: '#F7B75D'}}>lo</span>
                    <span style={{color: '#FEDE4B'}}>r</span>
                    <span style={{color: '#6DCE93'}}>Cl</span><span style={{color: '#4798B8'}}>ic</span>
                    <span style={{color: '#B282CB'}}>ke</span><span style={{color: 'pink'}}>r</span></h1>
                <div className="game-board">
                    <Board startTime = '30'/>
                </div>
            </div>
        );
    }
}

class Board extends React.Component{
    constructor(props){
        super(props);
        let squares = this.setSquares();
        let target = this.setTarget(squares);

        this.state = {
            target: target,
            status: 'start',
            timeLeft: this.props.startTime,
            score: 0,
            squares: squares,
            scoreboard: [],
        };
    }

    componentDidMount(){
        setInterval( () => {
            this.setState({
              timeLeft: this.state.timeLeft-1,
            });
            if (this.state.timeLeft <= 0){
                let newSquares = this.setSquares();
                let newTarget = this.setTarget(newSquares);
                let oldScore = this.state.score;
                this.setState({
                    score: 0,
                    timeLeft: this.props.startTime,
                    squares: newSquares,
                    target: newTarget,
                });
                alert(`Game Over!\nYour score: ${oldScore}`);
                let name = prompt('What is your name?', 'Gilgamesh')
                let names = this.state.scoreboard;
                names.push({name: name, score: oldScore});
                console.log(names);
                this.setState({
                    scoreboard: names,
                })
            }
        }, 1000);
    }

    setSquares(){
        let squares = Array(6).fill(null);

        for (let i = 0; i < squares.length; i++){
            squares[i] = {
                color: randomNumberBetween(1,6),
                number: randomNumberBetween(1,6),
            };
        }
        return squares;
    }

    setTarget(squares){

        let target;

        let randnumber = randomNumberBetween(1, 6);
        
        target = squares[randnumber-1].number;

        let numnum = randomNumberBetween(1, 6)
        return {color: target, number: numnum};
    }

    renderTarget(){
        return(
            <Square 
            className="target"
            color={this.state.target.color}
            number={this.state.target.number}
            />
        )
    }


    renderSquare(i) {
        return (
            <Square 
            onClick={() => this.handleClick(i)} 
            color={this.state.squares[i].color} 
            number={this.state.squares[i].number}
            />
        );
    }

    handleClick = (i) => {
        const squares = this.state.squares.slice();
        if (squares[i].number===this.state.target.color){
            this.setState({
                score: this.state.score +1,
                status: 'correct'
            });
        }
        else{
            this.setState({
                status: 'incorrect'
            })
        }
        let newSquares = this.setSquares();
        let newTarget = this.setTarget(newSquares);

        this.setState({
            squares: newSquares,
            target: newTarget
        })
    }

    displayScores(){
        let scores = this.state.scoreboard;
        scores.sort(function(a, b){return (b.score - a.score)})

        const result = scores.map((individual) =>
            <li>{individual.name}, {individual.score}</li>
        );
        return result;
    }


    render(){
        return (
            <div>
                <div className="score">Score: {this.state.score}</div>
                <div className="timer">Timer: {this.state.timeLeft}</div>
                <div className="scoreBoard">Scoreboard: <ol>{this.displayScores()}</ol></div>
                <div className="target">
                Select the name of the color of this word: 
                <div>
                    {this.renderTarget()}
                </div>
                below.
                </div>
                <div className="board">
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
                </div>
            </div>
        );
    }
}


class Square extends React.Component{
    getColor (i){
        if (i === 1){
            return {color: 'pink'};
        }
        else if (i === 2){
            return {color: '#F7B75D'};//orange
        }
        else if (i === 3){
            return {color: '#FEDE4B'};//yellow
        }
        else if (i === 4){
            return {color: '#6DCE93'};//green
        }
        else if (i === 5){
            return {color: '#4798B8'};//blue
        }
        else if (i === 6){
            return {color: '#B282CB',};//purple
        }
    }
    getColorName (i){
        if (i === 1){
            return 'pink';
        }
        else if (i === 2){
            return 'orange';
        }
        else if (i === 3){
            return 'yellow';
        }
        else if (i === 4){
            return 'green';
        }
        else if (i === 5){
            return 'blue';
        }
        else if (i === 6){
            return 'purple';
        }
    }

    render(){
        return(
            <button 
            className="square" 
            onClick={this.props.onClick} 
            style={this.getColor(this.props.color)}>
            {this.getColorName(this.props.number)}
            </button>
        );
    }
}


ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

