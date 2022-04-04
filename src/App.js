import React, { useEffect, useState } from 'react';
import './style/app.css';
import {getData} from './services/api';
import * as moment from 'moment';
import {Range} from 'react-range';

function App() {
  const DAFAULT_FILTER = {
    page: 1,
    pageSize: 8,
    symbol: "",
    name: "",
    status: "SOLD_OUT",
    totalRaise: [100,200],
    personalAllocation: [0.07,0.08]
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
  console.log(data);
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
      {data?.map((d, index) => (
        <div className="cards" key={index}>
          <div className="img">
            <img src={d?.photo} alt='' />
            <button className="soldout">Sold Out</button>
            <img className="rectangle" alt='' src="/image/Rectangle.png" />
          </div>
          <div className="title_card">
            <div className="nameCoin">
              <div>
                <p>{d?.name}</p>
              </div>
              <div>
                <img src="/image/Coin.png" />
              </div>
            </div>
            <div className="bcmc">
              <span>$BCMC</span>
            </div>
            <div className="priceTotal">
              <span className="totalRice">Total Raise</span>
              <span>{`$${d?.totalRaise} Max`}</span>
            </div>
            <div className="personal">
              <span>Personal Allocation</span>
              <span>{`$${d?.personalAllocation}`}</span>
            </div>
            <div className="date">
              <span>IDO starts on </span>&nbsp;<span>{moment(d?.startOn).format('MMMM Do YYYY')}</span>
            </div>
          </div>
        </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default App;
