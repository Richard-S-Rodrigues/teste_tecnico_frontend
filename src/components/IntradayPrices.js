import { useEffect, useState } from 'react'

import Chart from 'react-apexcharts'

import { api } from '../services/api'

import Loader from 'react-loader-spinner'

import PropTypes from 'prop-types'

const IntradayPrices = ({ companySymbol }) => {
	const [openPrice, setOpenPrice] = useState([])
	const [lowPrice, setLowPrice] = useState([])
	const [highPrice, setHighPrice] = useState([])
	const [closePrice, setClosePrice] = useState([])

	const [isLoading, setIsLoading] = useState(false)

	const getData = async (companySymbol) => {
		setOpenPrice([])
		setLowPrice([])
		setHighPrice([])
		setClosePrice([])

		setIsLoading(true)

		try {
			const response = await api.get(`/stock/${companySymbol}/intraday-prices?chartLast=5`)

			if (response.statusText !== 'OK') {
       	 		throw new Error('Error requesting intraday prices data...')
      		}

      		response.data.forEach(data => {
      			
				setOpenPrice((oData) => ([
		            {	
			          	x: data.label,
			          	y: data.open.toFixed(2)		
		            },
		            ...oData
		        ]))
		        setLowPrice((lData) => ([
		            {	
			          	x: data.label,
			          	y: data.low.toFixed(2)		
		            },
		            ...lData
		        ]))
		        setHighPrice((hData) => ([
		            {	
			          	x: data.label,
			          	y: data.high.toFixed(2)		
		            },
		            ...hData
		        ]))
		        setClosePrice((cData) => ([
		            {	
			          	x: data.label,
			          	y: data.close.toFixed(2)		
		            },
		            ...cData
		        ]))
      		})

		} catch(error) {
			console.error(error)
		}

		setIsLoading(false)
	}

	useEffect(() => {
		getData(companySymbol)
	}, [companySymbol])

	const chartData = {
	    series: [
	    	{
	    		name: 'Open price',
	    		data: Array.from(openPrice).reverse()
	    	},
	    	{
	    		name: 'High price',
	    		data: Array.from(highPrice).reverse()
	    	},
	    	{
	    		name: 'Low price',
	    		data: Array.from(lowPrice).reverse()
	    	},
	    	{
	    		name: 'Close price',
	    		data: Array.from(closePrice).reverse()
	    	},
	    ],

	    options: {
	      chart: {
	        height: 350,
	        type: 'line',
	      },
	      colors: [
        	'#081524',
        	'#4f8ff7',
        	'#216fed',
        	'#de4343'
      	  ],

	      stroke: {
        	curve: 'smooth',
        	width: 2
      	  },
	      dropShadow: {
	        enabled: true,
	        top: 3,
	        left: 2,
	        blur: 4,
	        opacity: 1,
	      },
	      
	      title: {
	        text: companySymbol,
	        align: 'center',
	        offsetY: 25,
	        offsetX: 20,
	        style: {
	        	fontSize: '26px',
	        }
	      },
	      subtitle: {
	        text: 'Intraday Prices',
	        align: 'center',
	        offsetY: 55,
	        offsetX: 20,
	        style: {
	        	fontSize: '18px',
	        }
	      },
	      markers: {
	        size: 6,
	        strokeWidth: 0,
	        hover: {
	          size: 9
	        }
	      },
	      grid: {
	        show: true,
	        padding: {
	          bottom: 0
	        }
	      },
	 
	      legend: {
	        position: 'top',
	        horizontalAlign: 'right',
	        offsetY: -20
	      },
	      responsive: [{
	        breakpoint: 438,
	        options: {
	          chart: {
	            width: '100%',
	            height: 500
	          }
	        }
	      }],
	    }
    }

	return (
		<>
			{isLoading ? (
				<Loader
	            	type="ThreeDots"
	            	color="#216fed"
	            	height={100}
	            	width={100}
	            	style={{textAlign: 'center'}} 
	          	/>
			) : (
				<Chart
	          		options={chartData.options}
	          		series={chartData.series}
	          		width='85%'
	          		type='line'
        		/>   
			)}
			
		</>
	)
}

IntradayPrices.propTypes = {
	companySymbol: PropTypes.string
}

export default IntradayPrices