import { useEffect, useState } from 'react'

import Charts from './components/Charts'
/* import CryptocurrencyData from './components/CryptocurrencyData' */

import { api } from './services/api'

import Loader from 'react-loader-spinner'

function App () {
  const [companyName, setCompanyName] = useState('')
  const [companyPrice, setCompanyPrice] = useState(0)
  const [seriesData, setSeriesData] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const getMarketStocks = async (filterData) => {
    setSeriesData([])    
    setCompanyName('')

    setIsLoading(true)

    try {
      const response = await api.get(
        filterData
          ? `/stock/${filterData}/batch?types=quote,chart&range=1m`
          : '/stock/market/batch?symbols=aapl,amzn,msft,googl,fb,nvda&types=quote,chart&range=1m'
      )

      if (response.statusText !== 'OK') {
        throw new Error('Error requesting market stock data...')
      }

      if (!filterData) {  
        Object.entries(response.data).forEach((data) => {
          setSeriesData((series) => [
            {
              x: data[1].quote.symbol,
              y: data[1].quote.latestPrice.toFixed(2)
            },
            ...series
          ])
        })
      } else {

        response.data.chart.forEach(chart => {

          setSeriesData((series) => [
            {
              x: chart.date,
              y: [
                chart.open.toFixed(2),
                chart.high.toFixed(2),
                chart.low.toFixed(2),
                chart.close.toFixed(2),
              ]
            },
            ...series
          ])
        })
        
        setCompanyName(response.data.quote.companyName)
        setCompanyPrice(response.data.quote.latestPrice.toFixed(2))
      }
     
    } catch (error) {
      console.error(error)
    }

    setIsLoading(false)

  }

  const handleSearch = (event) => {
    event.preventDefault()

    getMarketStocks(event.target[0].value)

    event.target[0].value = ''    
  }

  useEffect(() => {
    getMarketStocks()
  }, [])

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type='text' 
          placeholder='Search for company symbol. e.g. AAPL'
          style={{width: '80%'}} 
        />
      </form>

      {isLoading ? (
          <Loader
            type="ThreeDots"
            color="#081524"
            height={100}
            width={100}
            style={{textAlign: 'center'}} 
          />

        ) : (
          <>
          {!companyName ? (
            <Charts 
              seriesData={seriesData} 
              chartType='bar' 
              title='Top Tech Companies Latest Price'
            />
          ) : (
            <>
              <div>
                <button
                  style={{
                    border: 0,
                    borderRadius: '1em',
                    padding: '.8em',
                    cursor: 'pointer',
                    background: '#669ced',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '17px',
                    marginTop: '1em'
                  }} 
                  onClick={() => getMarketStocks()}
                >
                  See top techs stock prices 
                </button>  
              </div>
              <Charts 
                seriesData={seriesData} 
                chartType='candlestick' 
                title={`${companyName} - $${companyPrice}`} 
              />
            </>
          )}
          </>
      )}
      
    </div>
  )
}

export default App
