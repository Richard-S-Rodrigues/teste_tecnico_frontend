import { useEffect, useState } from 'react'

import Charts from './components/Charts'

import { api } from './services/api'

import './globalStyles.css'

function App() {

	const [companyName, setCompanyName] = useState('')
	const [price, setPrice] = useState(0)
	const [timesData, setTimesData] = useState([])
	const [seriesData, setSeriesData] = useState([])

	const getMarketStocks = async (filterData) => {
		try {
			const response = await api.get(
				filterData ? 
					`/stock/market/batch?symbols=aapl,fb,tsla&types=quote,chart&range=1m&filter=${filterData}`
				:
					'/stock/market/batch?symbols=aapl,fb,tsla&types=quote,chart&range=1m'
			)

			if (response.statusText !== 'OK') {
				throw new Error('Error requesting market stock data...')
			}
		
			Object.entries(response.data).forEach(data => {		

				let series = {
					name: data[1].quote.companyName,
					price: data[1].quote.latestPrice
				}

				setSeriesData(data => ([series, ...data]))

				let times = data[1].quote.latestTime

				setTimesData(data => ([times, ...data]))
				
			})
			
		} catch (error) {
			console.error(error)
		}

	}

	const getCompanyStocks = async (companySymbol, filterData) => {
		try {
			const response = await api.get(
				filterData ? 
					`/stock/${companySymbol}/batch?types=quote,chart&range=1m&filter=${filterData}`
				:
					`/stock/${companySymbol}/batch?types=quote,chart&range=1m`	
			)

			if (response.statusText !== 'OK') {
				throw new Error('Error requesting company stock data...')
			}
		

		} catch (error) {
			console.error(error)
		}	
		
	}


	useEffect(() => {
	
		getMarketStocks()

	}, [])

  return (
    <div>
    	<div>			
			<h1>{companyName}</h1>
			
			<div>
				$ {price}
			</div>
		</div>

  		<Charts series={seriesData} times={timesData}/> 
    </div>
  );
}

export default App;
