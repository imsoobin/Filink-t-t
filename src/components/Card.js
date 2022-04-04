import React from 'react';
import * as moment from 'moment';

function Card(props) {
    const {data} = props;
    return (
        <>
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
        </>
    );
}

export default Card;