import React from 'react';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      digits: [[], [], []]
    };

    this.numberToBinary = this.numberToBinary.bind(this);
    this.numberAsBinaryArrayPair = this.numberAsBinaryArrayPair.bind(this);
  }
  numberToBinary(base10Number) {
    const base2Values = [8, 4, 2, 1];
    let output = [0, 0, 0, 0];
    let remainder = base10Number;
    base2Values.forEach((val, idx) => {
      const left = remainder - val;
      if(left >= 0) {
        output[idx] = 1;
        remainder = left
      }
    });
    return output;
  }
      
      numberAsBinaryArrayPair(number) {
        const pair = [];
        if(number < 10) {
          pair[0] = this.numberToBinary();
          pair[1] = this.numberToBinary(number);
        } else {
          const numberAsArray = String(number).split('');
          pair[0] = this.numberToBinary(parseInt(numberAsArray[0], 10));
          pair[1] = this.numberToBinary(parseInt(numberAsArray[1], 10));
        }
        
        return pair;
      }
  
  componentDidMount() {
    setInterval(function() {
      const date = new Date();
      const newDigits = [
        this.numberAsBinaryArrayPair(date.getHours()), 
        this.numberAsBinaryArrayPair(date.getMinutes()),
        this.numberAsBinaryArrayPair(date.getSeconds())
      ];
      this.setState({
        digits: newDigits
      });
    }.bind(this), 1000);
  }
  
  render() {

    const Pip = ({isOn}) =>
  <div className={`pip ${isOn && 'pip--on'}`}></div>

const BinaryDigit = ({base2NumberAsArray}) =>
  <div className="binary-digit">
    {
      base2NumberAsArray.map((pip, idx )=> <Pip key={idx} isOn={pip === 1} />)
    }
 </div>

const BinaryDigitGroup = ({group}) =>
  <div className="binary-digit-group">
    {
      group.map((binaryDigit, idx) => <BinaryDigit base2NumberAsArray={binaryDigit} key={idx} /> )
    }
  </div>
  console.log(Pip)
  console.log(this.state.digits)

    return (
      <div className="clock-container">
        <div className="clock">
         {
           this.state.digits.map(digit => <BinaryDigitGroup group={digit} />)
           
         }
        </div>
      </div>
    );
  }
}

  