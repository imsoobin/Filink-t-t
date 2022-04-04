import React, { useEffect, useState } from 'react';
import './style/app.css';
import {getData} from './services/api';
import {Range} from 'react-range';
import Card from './components/Card';

function App() {
  const DAFAULT_FILTER = {
    page: 1,
    pageSize: 12,
    symbol: "",
    name: "",
    status: "",
    totalRaise: "",
    personalAllocation: ""
 }
 
  const [data, setData] = useState();
  const [filter, setFilter] = useState(DAFAULT_FILTER);
  const [loading, setLoading] = useState(false);
  const getDataTransactions = () => {
    setLoading(true);
    getData(filter).then(res => {
      if(res?.status === 200){
        if(res?.data?.statusCode === 1){
          setData(res?.data?.data?.fundProjects)
        }
      }
      setLoading(false);
    })
  }
  useEffect(() => {
    getDataTransactions(filter);
  }, []);
  const onSubmitFilters = () => {
    let newFilter = {
      ...filter,
      page: 1
    }
    setFilter(newFilter)
    getDataTransactions(newFilter)
  }
  const onClearFilter = () => {
    setFilter(DAFAULT_FILTER)
    getDataTransactions(DAFAULT_FILTER)
    setLoading(false)
  }
  const minn = 1;
  const max = 1000;
  const [ranges, setRanges] = useState();
  return (
    <div className="App">
      <div className="container"> 
        <div className="top_title">
        <div>
          <h1>2nd largest  of Transactions:</h1>
          <p>1.10 ETH</p>
        </div>
        </div>
        <div className="transactions">
          <div className="cardTrans">
          <div className="title">
            <img src="/image/Coin.png" alt=""/>
            <span className="coin1">Total transactions:</span>
          </div>
          <div className="price">
            <p>79</p>
          </div>
          </div>

          <div className="cardTrans">
          <div className="title">
            <img src="/image/Coin.png"alt=""/>
            <span className="coin2">AVG of block time</span>
          </div>
          <div className="price">
            <p>19.455</p>
          </div>
          </div>

          <div className="cardTrans">
          <div className="title">
            <img src="/image/Coin.png" alt=""/>
            <span className="coin3">AVG of ETH/transactions</span>
          </div>
          <div className="price">
            <p>1.10 ETH</p>
          </div>
          </div>
        </div>

        <div className="filter">
            <div className="form_container">
              <div>
              <label>Name:</label>
              <input 
                onChange={(e) => setFilter({
                  ...filter, name: e.target.value
                })}
                placeholder="name" type="text"
              />
              </div>
              <div>
              <label>Symbol:</label>
              <input
                onChange={(e) => setFilter({
                  ...filter, symbol: e.target.value
                })}
                placeholder="symbol" type="text"
              />
              </div>
              <div>
              <label>Status:</label>
              <input 
                onChange={(e) => setFilter({
                  ...filter, status: e.target.value
                })}
                placeholder="Status" type="text"
              />
              </div>
              <div>
                <label>TotalRaise:</label>
                
              </div>
              <div>
                <label>PersonalAllocation:</label>
                <input
                  onChange={(e) => setFilter({
                    ...filter, personalAllocation: e.target.value
                  })}
                  placeholder="personalAllocation" type="number"
                />
              </div>
            </div>
            <div className="btn_submit">
              <button onClick={onSubmitFilters}>Submit</button>
              <button onClick={onClearFilter}>Cancel</button>
            </div>
        </div>
        <div className="data">
          <Card data={data} />   
        </div>
      </div>
    </div>
  );
}

export default App;
