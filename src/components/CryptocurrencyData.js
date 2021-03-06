import { useEffect, useState } from 'react'

import CandlestickCharts from './CandlestickCharts'

import { api } from '../services/api'

const CryptocurrencyData = () => {
	const [seriesData, setSeriesData] = useState([])

	const getData = async () => {
		try {
			const response = await api.get('/crypto/btcusd/book')

			if (response.statusText !== 'OK') {
       	 		throw new Error('Error requesting Cryptocurrency data...')
      		}

			for( let i = 0; i < 5; i++) {

				setSeriesData((series) => [
		            {
		              x: new Date(response.data.bids[i].timestamp * 1000).toLocaleTimeString(),
		              y: [
		              	Number(response.data.bids[i].price), 
		              	Number(response.data.asks[i].price),
		              	Number(response.data.asks[i].price) - Number(response.data.bids[i].price)
		              ]
		            },
		            ...series
		        ])
			}

		} catch(error) {

		}
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<div>
			<CandlestickCharts 
                seriesData={seriesData} 
            />
		</div>
	)
}

export default CryptocurrencyData