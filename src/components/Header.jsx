function Header({ isDark, onToggleTheme }) {
	return (
		<header className="relative overflow-hidden rounded-2xl border border-[rgba(220,205,185,0.9)] bg-gradient-to-br from-[#fff6e5] via-[#f7e6ce] to-[#efe0c7] p-7 shadow-[0_24px_60px_rgba(62,52,33,0.12)] dark:border-[rgba(80,77,70,0.8)] dark:from-[#1a1b1f] dark:via-[#23252b] dark:to-[#2a2d35]">
			<div className="pointer-events-none absolute -top-10 right-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(31,122,90,0.2),_transparent_70%)] dark:bg-[radial-gradient(circle,_rgba(76,128,214,0.25),_transparent_70%)]" />
			<div className="relative z-10 flex flex-wrap items-start justify-between gap-6">
				<div className="space-y-4">
					<h1 className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-[#1b1a17] sm:text-4xl dark:text-[#f6efe4]">
					YNE Survey Analytics
				</h1>
					<p className="max-w-2xl text-sm text-[#5c564b] sm:text-base dark:text-[#c7bdaf]">
					Aggregated insights from youth training outreach across Addis Ababa.
					This view highlights distribution breakdowns and the strongest signals
					for program planning.
				</p>
				</div>
				<button
					type="button"
					onClick={onToggleTheme}
					className="rounded-full border border-[#1f1b16] bg-[#1f1b16] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#fff8ee] transition hover:-translate-y-0.5 hover:bg-[#2c2620] dark:border-[#cbbfae] dark:bg-[#f6efe4] dark:text-[#1b1a17] dark:hover:bg-[#efe5d6]"
				>
					{isDark ? 'Light Mode' : 'Dark Mode'}
				</button>
			</div>
			<div className="relative z-10 mt-6 flex flex-wrap gap-2">
				<span className="rounded-full bg-[#1f1b16] px-3 py-1 text-xs tracking-wide text-[#fff8ee] shadow-[0_8px_20px_rgba(31,27,22,0.2)] dark:bg-[#f6efe4] dark:text-[#1b1a17]">
					498 Responses
				</span>
				<span className="rounded-full bg-[#1f1b16] px-3 py-1 text-xs tracking-wide text-[#fff8ee] shadow-[0_8px_20px_rgba(31,27,22,0.2)] dark:bg-[#f6efe4] dark:text-[#1b1a17]">
					Addis Ababa Subcities
				</span>
				<span className="rounded-full bg-[#1f1b16] px-3 py-1 text-xs tracking-wide text-[#fff8ee] shadow-[0_8px_20px_rgba(31,27,22,0.2)] dark:bg-[#f6efe4] dark:text-[#1b1a17]">
					Structured Survey
				</span>
			</div>
		</header>
	)
}

export default Header
