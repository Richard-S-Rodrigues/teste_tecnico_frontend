import { useState } from 'react'

import IndustriesStock from './components/IndustriesStock'
import IntradayPrices from './components/IntradayPrices'

import './styles.css'

function App () {
  const [symbol, setSymbol] = useState('AAPL')

  return (
    <div className='container'>
      <div>
        <IndustriesStock />
        <hr style={{color: '#fff'}}></hr>
      </div>
       <div style={{marginTop: '5em'}}>
          <div className='actionsContainer'>
           <button 
            onClick={() => setSymbol('AAPL')}
            >
              AAPl
           </button>
           <button 
            onClick={() => setSymbol('AMZN')}
            >
              AMZN
           </button>
           <button 
            onClick={() => setSymbol('MSFT')}
            >
              MSFT
           </button>
           <button 
            onClick={() => setSymbol('GOOGL')}
            >
              GOOGL
           </button>
           <button 
            onClick={() => setSymbol('FB')}
            >
              FB
           </button>
           <button 
            onClick={() => setSymbol('NVDA')}
            >
              NVDA
           </button>
          </div>

          <div>
            <IntradayPrices companySymbol={symbol}/>
          </div>
       </div>    
    </div>
  )
}

export default App
