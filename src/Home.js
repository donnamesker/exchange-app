import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

const Rates = (props) => {
  const {
    Currency,
    Rate,
    Inverse,
  } = props.rates;

  return (
    <div className="row justify-content-center border-bottom">
        <div className="col-4 col-md-1 my-2">
            {Currency}
        </div>
        <div className="col-4 col-md-1 my-2">
            {Rate}
        </div>
        <div className="col-4 col-md-1 my-2">
            {Inverse}
        </div>
    </div>
  )
}
class CurrencyEx extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseAmt: 1,
            baseCurr: 'EUR',
            toAmt: 1,
            toCurr: 'EUR',
            exDate:'',
            results: [],
            resultCurr: [],
            error: '',
        };
        
        this.handleChangeBase = this.handleChangeBase.bind(this);
        this.handleChangeBaseAmt = this.handleChangeBaseAmt.bind(this);
        this.handleChangeTo = this.handleChangeTo.bind(this);
        this.handleChangeToAmt = this.handleChangeToAmt.bind(this);
        this.handleSwap = this.handleSwap.bind(this);
    }

    handleChangeBase(event) {
        this.setState({ baseCurr: event.target.value });
        if(this.state.toCurr == event.target.value) {
            this.setState({toAmt: this.state.baseAmt});
        } else {
            fetch(`https://api.frankfurter.dev/v1/latest?base=${event.target.value}&symbols=${this.state.toCurr}&amount=${this.state.baseAmt}`)
            .then(checkStatus)
            .then(json)
            .then((data) => {
                if (!data.rates) {
                    throw new Error(data.Error);
                }
                if (data.rates) {
                    const convertedAmount = (data.rates[this.state.toCurr]).toFixed(2);
                    this.setState({toAmt: convertedAmount, baseCurr: this.state.baseCurr, baseAmt: this.state.baseAmt, toCurr: this.state.toCurr, error: '' });
                }
            })
            .catch((error) => {
                this.setState({ error: error.message });
                console.log(error);
            })
            //get the list of rates
            fetch(`https://api.frankfurter.dev/v1/latest?base=${event.target.value}`)
            .then(checkStatus)
            .then(json)
            .then((data) => {
                if (!data.rates) {
                    throw new Error(data.Error);
                }
                if (data.rates) {
                    this.setState({ results: data.rates, exDate: data.date, error: '' });
                }
                this.setState({exDate: data.date});
            })
            .catch((error) => {
                this.setState({ error: error.message });
                console.log(error);
            })
        }
    }

    handleChangeBaseAmt(event) {
        if(!event.target.value) { event.target.value = 1; }
        this.setState({ baseAmt: event.target.value });
        if(this.state.toCurr == this.state.baseCurr) {
            this.setState({toAmt: this.state.baseAmt});
        } else {
            fetch(`https://api.frankfurter.dev/v1/latest?base=${this.state.baseCurr}&symbols=${this.state.toCurr}&amount=${event.target.value}`)
            .then(checkStatus)
            .then(json)
            .then((data) => {
                if (!data.rates) {
                    throw new Error(data.Error);
                }
                if (data.rates) {
                    const convertedAmount = (data.rates[this.state.toCurr]).toFixed(2);;
                    this.setState({toAmt: convertedAmount, baseCurr: this.state.baseCurr, baseAmt: this.state.baseAmt, toCurr: this.state.toCurr, error: '' });
                }
            })
            .catch((error) => {
                this.setState({ error: error.message });
                console.log(error);
            })
        }
    }

    handleChangeTo(event) {
        this.setState({ toCurr: event.target.value });
        if(event.target.value == this.state.baseCurr) {
            this.setState({toAmt: this.state.baseAmt});
        } else {
            fetch(`https://api.frankfurter.dev/v1/latest?base=${this.state.baseCurr}&symbols=${event.target.value}&amount=${this.state.baseAmt}`)
            .then(checkStatus)
            .then(json)
            .then((data) => {
                if (!data.rates) {
                    throw new Error(data.Error);
                }
                if (data.rates) {
                    const convertedAmount = (data.rates[event.target.value]).toFixed(2);;
                    this.setState({toAmt: convertedAmount, baseCurr: this.state.baseCurr, baseAmt: this.state.baseAmt, toCurr: this.state.toCurr, error: '' });
                }
            })
            .catch((error) => {
                this.setState({ error: error.message });
                console.log(error);
            })
        }
    }

    handleChangeToAmt(event) {
        this.setState({ toAmt: event.target.value });
        if(!event.target.value) { event.target.value=1; }
        fetch(`https://api.frankfurter.dev/v1/latest?base=${this.state.toCurr}&symbols=${this.state.baseCurr}&amount=${event.target.value}`)
        .then(checkStatus)
        .then(json)
        .then((data) => {
            if (!data.rates) {
                throw new Error(data.Error);
            }
            if (data.rates) {
                const convertedAmount = (data.rates[this.state.baseCurr]).toFixed(2);;
                this.setState({baseAmt: convertedAmount, baseCurr: this.state.baseCurr, toAmt: event.target.value, toCurr: this.state.toCurr, error: '' });
            }
        })
        .catch((error) => {
            this.setState({ error: error.message });
            console.log(error);
        })
    }

    handleSwap (event) {
        if(this.state.baseCurr == this.state.toCurr) {
        } else {
            fetch(`https://api.frankfurter.dev/v1/latest?base=${this.state.toCurr}&symbols=${this.state.baseCurr}&amount=${this.state.baseAmt}`)
            .then(checkStatus)
            .then(json)
            .then((data) => {
                if (!data.rates) {
                    throw new Error(data.Error);
                }
                if (data.rates) {
                    const convertedAmount = (data.rates[this.state.baseCurr]).toFixed(2);
                    this.setState({toAmt: convertedAmount, baseCurr: this.state.toCurr, baseAmt: this.state.baseAmt, toCurr: this.state.baseCurr, error: '' });
                }
            })
            .catch((error) => {
                this.setState({ error: error.message });
                console.log(error);
            })

            //get the list of rates
            fetch(`https://api.frankfurter.dev/v1/latest?base=${this.state.toCurr}`)
            .then(checkStatus)
            .then(json)
            .then((data) => {
                if (!data.rates) {
                    throw new Error(data.Error);
                }
                if (data.rates) {
                    this.setState({ results: data.rates, error: '' });
                }
            })
            .catch((error) => {
                this.setState({ error: error.message });
                console.log(error);
            })
        }
    }

    componentDidMount () {
        let { baseCurr } = this.state;
        baseCurr = baseCurr.trim().toUpperCase();
        let { toCurr } = this.state;
        toCurr = toCurr.trim().toUpperCase();
        let { baseAmt } = this.state;
        if (!baseCurr) {
            baseCurr = "EUR";
        }
        if (!toCurr) {
            toCurr = "USD";
        }
        if (!baseAmt) {
            baseAmt = 10;
        }
        // get the currency list
        fetch(`https://api.frankfurter.dev/v1/currencies`)
            .then(checkStatus)
            .then(json)
            .then((data) => {
                if (!data) {
                    throw new Error(data.Error);
                }
                if (data) {
                    this.setState({ resultCurr: data, error: '' });
                }       
            })
            .catch((error) => {
                this.setState({ error: error.message });
                console.log(error);
            })
        //get the list of rates
        fetch(`https://api.frankfurter.dev/v1/latest?base=${baseCurr}`)
            .then(checkStatus)
            .then(json)
            .then((data) => {
            if (!data.rates) {
                throw new Error(data.Error);
            }
            if (data.rates) {
                this.setState({ results: data.rates, exDate: data.date, error: '' });
            }
            })
            .catch((error) => {
                this.setState({ error: error.message });
                console.log(error);
            })
    
    }
    
    render() {
        const { exDate, baseAmt, baseCurr, toAmt, toCurr, results, resultCurr, error } = this.state;
        const RenderSelect = ({ selID, options, selected, changeCall }) => {
            if (options.length === 0) {
            return null;
            }
            return (
                <select 
                className="form-control form-control-sm"
                id={selID}
                defaultValue={selected}
                onChange={changeCall}
                >
                    {options.map(item => (
                    <option key={item.currID} value={item.currID}>{item.currName} - ({item.currID})</option>
                    ))}
                </select>
            );
        };
        return (
        <div className="container">
            <div className="row">
                <div className="col-12">      
                    <div className="row justify-content-center my-4">
                        <div className="col-4 col-md-2">
                            Base Amount
                            <input
                                type="number"
                                className="form-control form-control-sm text-end"
                                id="baseAmt"
                                placeholder="1"
                                value={baseAmt}
                                onChange={this.handleChangeBaseAmt}
                            />
                        </div>
                        <div className="col-7 col-md-auto">
                            <label>
                                Base Currency
                                {(() => {
                                    if (error) {
                                        return error;
                                    }
                                    if(resultCurr) {
                                        const currencies = [];
                                        Object.entries(resultCurr).forEach(([key, value]) => {
                                            currencies.push({currID: key, currName: value,});
                                        });
                                        return (
                                            <RenderSelect selID="baseCurr" options={currencies} selected={baseCurr} changeCall={this.handleChangeBase}/>
                                        );
                                    }
                                })()}
                            </label>
                        </div>
                        <div className="col-12 col-md-auto pt-3 text-center">
                            <button type="button" class="btn btn-outline-dark rounded-circle" onClick={this.handleSwap} title="Swap Currencies">
                                <span class="d-md-none"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16"><path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/></svg></span>
                                <span class="d-none d-md-inline"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"/></svg></span>
                            </button>
                        </div>
                        <div className="col-4 col-md-2">
                            To Amount
                            <input
                                type="number"
                                className="form-control form-control-sm text-end"
                                id="toAmt"
                                placeholder="1"
                                value={toAmt}
                                onChange={this.handleChangeToAmt}
                            />
                        </div>
                        <div className="col-7 col-md-auto">
                            <label>
                                To Currency
                                    {(() => {
                                    if (error) {
                                        return error;
                                    }
                                    if(resultCurr) {
                                        const currencies = [];
                                        Object.entries(resultCurr).forEach(([key, value]) => {
                                            currencies.push({currID: key, currName: value,});
                                        });
                                        return (
                                            <RenderSelect selID="toCurr" options={currencies} selected={toCurr} changeCall={this.handleChangeTo}/>
                                        );
                                    }
                                    })()}
                            </label>
                        </div>
                    </div>
                    <div className="row my-4 border-bottom border-dark mb-2 pb-2">
                        <div className="col-12 text-center">
                        <p>{baseAmt} {baseCurr} = {toAmt} {toCurr}</p>
                        </div>
                    </div>
                    <div id="rateTable"></div>
                    <div className="row justify-content-center border-bottom">
                        <div className="col-12 fw-light fst-italic text-center"><small>* as of: {exDate}</small></div>
                        <div className="col-4 col-md-1 my-2 fw-bold">
                            Currency
                        </div>
                        <div className="col-4 col-md-1 my-2 fw-bold">
                            Rate
                        </div>
                        <div className="col-4 col-md-1 my-2 fw-bold">
                            Inverse
                        </div>
                    </div>
                    {(() => {
                        if (error) {
                            return error;
                        }
                        const rates = [];
                        Object.entries(results).forEach(([key, value]) => {
                            let inverseRate = 1/value;
                            rates.push({Currency: key, Rate: value, Inverse: inverseRate.toFixed(5)});
                        });
                        return rates.map((rates) => {
                            return <Rates key={rates.Currency} rates={rates} />;
                        })
                    })()}
                </div>
            </div>
        </div>
        )
    }
}

export default CurrencyEx;