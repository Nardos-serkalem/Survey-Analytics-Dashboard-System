function ChartCard({ title, subtitle, data, total, variant = 'bar' }) {
	const entries = Object.entries(data || {})
		.map(([label, value]) => ({
			label,
			value
		}))
		.sort((a, b) => b.value - a.value)

	const values = entries.map((item) => item.value)
	const maxValue = Math.max(...values, 1)
	const totalValue = typeof total === 'number'
		? total
		: values.reduce((sum, value) => sum + value, 0)

	const isPie = variant === 'pie'
	const palette = [
		'#1f7a5a',
		'#c06a3e',
		'#cc7a3f',
		'#2b6cb0',
		'#9d4f1f',
		'#6b4f7a'
	]

	const segments = entries.map((item, index) => {
		const normalizedLabel = String(item.label).toLowerCase()
		const explicitColor = normalizedLabel === 'yes'
			? '#1f7a5a'
			: normalizedLabel === 'no'
				? '#c06a3e'
				: null
		const percent = totalValue > 0 ? (item.value / totalValue) * 100 : 0
		return {
			...item,
			percent,
			color: explicitColor || palette[index % palette.length]
		}
	})

	let cumulative = 0
	const gradientStops = segments.map((segment) => {
		const start = cumulative
		cumulative += segment.percent
		const end = cumulative
		return `${segment.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`
	})

	return (
		<div className="rounded-2xl border border-[rgba(222,209,190,0.9)] bg-white/90 p-5 shadow-[0_16px_40px_rgba(62,52,33,0.08)] transition-transform duration-200 hover:-translate-y-1 dark:border-[rgba(87,82,74,0.9)] dark:bg-[#1f2127] dark:shadow-[0_16px_40px_rgba(5,7,12,0.3)]">
			<div>
				<p className="text-sm font-semibold text-[#1b1a17] dark:text-[#f6efe4]">{title}</p>
				{subtitle ? (
					<p className="mt-1 text-xs text-[#7a6f62] dark:text-[#bfb4a7]">{subtitle}</p>
				) : null}
			</div>

			{isPie ? (
				<div className="mt-4 grid gap-4 md:grid-cols-[140px_1fr] md:items-center">
					<div
						className="h-[140px] w-[140px] rounded-full border-[10px] border-[#fff2df] shadow-[inset_0_0_0_1px_rgba(222,209,190,0.8)] dark:border-[#2b2e35] dark:shadow-[inset_0_0_0_1px_rgba(87,82,74,0.8)]"
						style={{ background: `conic-gradient(${gradientStops.join(', ')})` }}
						role="img"
						aria-label={`${title} pie chart`}
					/>
					<div className="space-y-2">
						{segments.map((item) => (
							<div
								className="grid grid-cols-[12px_1fr_auto] items-center gap-2"
								key={item.label}
							>
								<span
									className="h-2.5 w-2.5 rounded-full"
									style={{ background: item.color }}
								/>
								<span className="text-xs text-[#3c3731] dark:text-[#e7dfd2]">{item.label}</span>
								<span className="text-xs text-[#5e554a] dark:text-[#c2b8aa]">
									{item.value} ({Math.round(item.percent)}%)
								</span>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="mt-4 space-y-2">
					{entries.map((item) => {
						const percent = totalValue > 0
							? Math.round((item.value / totalValue) * 100)
							: 0

						return (
							<div
								className="grid items-center gap-3 md:grid-cols-[1fr_2fr_auto]"
								key={item.label}
							>
								<span className="text-xs text-[#3c3731] dark:text-[#e7dfd2]">{item.label}</span>
								<div className="h-2.5 overflow-hidden rounded-full bg-[#f4e7d3] dark:bg-[#2c2f36]">
									<span
										className="block h-full rounded-full bg-gradient-to-r from-[#d96b2c] to-[#f0b478]"
										style={{ width: `${Math.round((item.value / maxValue) * 100)}%` }}
									/>
								</div>
								<span className="text-xs text-[#5e554a] dark:text-[#c2b8aa]">{item.value} ({percent}%)</span>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default ChartCard
