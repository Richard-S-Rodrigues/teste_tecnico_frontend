import { useEffect, useState } from 'react'

import Charts from './components/Charts'

import { api } from './services/api'

import './globalStyles.css'

function App () {
  const [companyName, setCompanyName] = useState('')
  const [seriesData, setSeriesData] = useState([])

  const getMarketStocks = async (filterData) => {
    setSeriesData([])

    try {
      const response = await api.get(
        filterData
          ? `/stock/${filterData}/batch?types=quote,chart&range=1m`
          : '/stock/market/batch?symbols=aapl,fb,tsla&types=quote,chart&range=1m'
      )

      if (response.statusText !== 'OK') {
        throw new Error('Error requesting market stock data...')
      }

      if (!filterData) {
        Object.entries(response.data).forEach((data) => {
          setSeriesData((series) => [
            {
              name: data[1].chart[0].symbol,
              data: [
                data[1].chart[0].open,
                data[1].chart[0].close
              ]
            },
            ...series
          ])
        })
      } else {
        setSeriesData((series) => [
          {
            name: response.data.chart[0].symbol,
            data: [
              response.data.chart[0].open,
              response.data.chart[0].close
            ]
          },
          ...series
        ])

        setCompanyName(response.data.quote.companyName)
      }
    } catch (error) {
      console.error(error)
    }
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
      <div>
        <div>{companyName}</div>

        <form onSubmit={handleSearch}>
          <input type='text' />
        </form>
      </div>

      <Charts series={seriesData} />
    </div>
  )
}

export default App
