import React, { useEffect } from 'react'

import styles from './Panel.module.scss'

function Panel({ value, currency, onChangeValue, onChangeCurrency }) {
	const defaultCurrencies = ['EUR', 'USD', 'SEK', 'JPY']

	const isActive = (defaultCurrency) => {
		if (currency === defaultCurrency) return true
	}

	return (
		<div className={styles.panel}>
			<div className={styles.currencies}>
				{defaultCurrencies.map((defaultCurrency, index) =>
					<button
						key={index}
						onClick={() => onChangeCurrency(defaultCurrency)}
						className={`${styles.currency} ${isActive(defaultCurrency) && styles.active}`}
					>
						{defaultCurrency}
					</button>
				)}
			</div>
			<input
				value={value}
				onChange={(e) => onChangeValue(e.target.value)}
				className={styles.input}
				type="number"
				placeholder="0"
			/>
		</div>
	)
}

export default Panel