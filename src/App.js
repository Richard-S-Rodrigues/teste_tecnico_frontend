import { useEffect, useState } from 'react'

import Charts from './components/Charts'

import { api } from './services/api'

import Loader from 'react-loader-spinner'

function App () {
  const [companyName, setCompanyName] = useState('')
  const [companyPrice, setCompanyPrice] = useState(0)
  const [seriesData, setSeriesData] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const getMarketStocks = async (filterData) => {
    setSeriesData([])
 
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
              x: data[1].chart[0].symbol,
              y: data[1].quote.latestPrice.toFixed(2)
            },
            ...series
          ])
        })
      } else {
        setSeriesData((series) => [
          {
            x: response.data.chart[0].symbol,
            y: response.data.quote.latestPrice.toFixed(2)
          },
          ...series
        ])

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
            <Charts 
              seriesData={seriesData} 
              chartType='line' 
              title={`${companyName} - $${companyPrice}`} 
            />
          )}
          </>
      )}
      
      
    </div>
  )
}

export default App
