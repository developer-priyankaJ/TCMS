import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/calculator.scss';
import Handler from './handler';

class Calculator extends Component {
    constructor(props){
      super(props);
      this.state = {

        "calcul": 0,
        "pas_ch": 0
      };
      this.calc_array = [];
      this.resultRef = React.createRef();

      this.calcul = 0;
      this.pas_ch = 0;
      this.initFunc = this.initFunc.bind(this);
      Handler.key_detect_calc = Handler.key_detect_calc.bind(this);
      Handler.f_calc = Handler.f_calc.bind(this);
      Handler.add_calc = Handler.add_calc.bind(this);
      //this.initFunc();
    }
    componentDidMount(){
      this.initFunc();
    }
    initFunc(){
      console.log("this.resultRef >",this.refs.resultRef);
      this.refs.resultRef.value = 0;
      this.calc_array = ['=',1,'0','0',0];
      this.refs.resultRef.focus();
    }
    render() {
        const { updateResult, updateKey } = this.props;
        return (
            <div>
                <table className="calculator" id="calc">
                  <tbody>
                  <tr>
                      <td colSpan="4" className="calc_td_result">
                          <input type="text" readOnly="readonly" name="calc_result" defaultValue={0} ref="resultRef" id="calc_result" className="calc_result" onKeyDown={(event)=>Handler.key_detect_calc(event)} />
                      </td>
                  </tr>

                  <tr>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="CE" onClick={(event)=>Handler.f_calc('ce')} />
                      </td>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="&larr;" onClick={(event)=>Handler.f_calc('nbs')} />
                      </td>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="%" onClick={(event)=>Handler.f_calc('%')} />
                      </td>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="+" onClick={(event)=>Handler.f_calc('+')} />
                      </td>
                  </tr>
                  <tr>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="7" onClick={(event)=>Handler.add_calc(7)} />
                      </td>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="8" onClick={(event)=>Handler.add_calc(8)} />
                      </td>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="9" onClick={(event)=>Handler.add_calc(9)} />
                      </td>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="-" onClick={(event)=>Handler.f_calc('-')} />
                      </td>
                  </tr>
                              <tr>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="4" onClick={(event)=>Handler.add_calc(4)} />
                      </td>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="5" onClick={(event)=>Handler.add_calc(5)} />
                      </td>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="6" onClick={(event)=>Handler.add_calc(6)} />
                      </td>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="x" onClick={(event)=>Handler.f_calc('*')} />
                      </td>
                  </tr>
                  <tr>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="1" onClick={(event)=>Handler.add_calc(1)} />
                      </td>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="2" onClick={(event)=>Handler.add_calc(2)} />
                      </td>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="3" onClick={(event)=>Handler.add_calc(3)} />
                      </td>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="&divide;" onClick={(event)=>Handler.f_calc('')} />
                      </td>
                  </tr>
                  <tr>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="0" onClick={(event)=>Handler.add_calc(0)} />
                      </td>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="&plusmn;" onClick={(event)=>Handler.f_calc('+-')} />
                      </td>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="," onClick={(event)=>Handler.add_calc('.')} />
                      </td>
                      <td className="calc_td_btn">
                              <input type="button" className="calc_btn" value="=" onClick={(event)=>Handler.f_calc('=')} />
                      </td>
                  </tr>
                </tbody>
              </table>
              <input className="submit-button" type="submit" value="Update Value" onClick={()=> updateResult(updateKey, this.refs.resultRef.value)} />
            </div>
        );
    }
};
Calculator.propTypes = {
  updateResult:PropTypes.func,
  updateKey:PropTypes.string
};

export default Calculator;
