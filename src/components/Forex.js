import { useEffect, useState } from 'react'

import Charts from './Charts'

import { api } from '../services/api'

const Forex = () => {
	const [seriesData, setSeriesData] = useState([])

	const getData = async () => {
		try {
			const response = await api.get('/fx/historical?symbols=USDCAD,USDGBP,USDJPY')

			if (response.statusText !== 'OK') {
       	 		throw new Error('Error requesting Forex data...')
      		}
      		response.data.forEach(data => {
      			console.log(data[0])
				setSeriesData((series) => [
		            {
		            	
			            x: data[0].date,
			            y: data[0].rate	
		            	
		            },
		            ...series
		        ])
      		})

		} catch(error) {
			console.error(error)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<div>
			<Charts 
                seriesData={seriesData}
                chartType='line'
                title='Bitcoin - USD' 
            />
		</div>
	)
}

export default Forex