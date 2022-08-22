import axios from 'axios';
import React from 'react'
import Panel from './components/Panel';

import './scss/App.scss'

function App() {
	// const [ratesRef.current, setratesRef.current] = React.useState({})
	const ratesRef = React.useRef({})
	const [fromPrice, setFromPrice] = React.useState(0)
	const [toPrice, setToPrice] = React.useState(1)
	const [fromCurrency, setFromCurrency] = React.useState('EUR')
	const [toCurrency, setToCurrency] = React.useState('SEK')

	const getRates = async () => {
		try {
			const { data } = await axios.get("https://www.cbr-xml-daily.ru/latest.js")
			ratesRef.current = { ...data.rates, "RUB": 1 }
			onChangeFromPrice(1)
		} catch (error) {
			console.error(error)
		}
	}

	console.log(ratesRef);

	React.useEffect(() => {
		getRates()
	}, [])

	const onChangeFromPrice = (value) => {
		const price = value / ratesRef.current[fromCurrency]
		const result = price * ratesRef.current[toCurrency]
		setToPrice(result.toFixed(2))
		setFromPrice(value)
	}

	const onChangeToPrice = (value) => {
		const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value
		setFromPrice(result.toFixed(2))
		setToPrice(value)
	}

	React.useEffect(() => {
		onChangeFromPrice(fromPrice)
	}, [fromCurrency])

	React.useEffect(() => {
		onChangeToPrice(toPrice)
	}, [toCurrency])

	return (
		<div className="App">
			<div className="card">
				<Panel
					value={fromPrice}
					currency={fromCurrency}
					onChangeValue={onChangeFromPrice}
					onChangeCurrency={setFromCurrency}
				/>
				<Panel
					value={toPrice}
					currency={toCurrency}
					onChangeValue={onChangeToPrice}
					onChangeCurrency={setToCurrency}
				/>
			</div>
		</div>
	);
}

export default App;
