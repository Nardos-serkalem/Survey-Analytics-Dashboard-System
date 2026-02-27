function StatCard({ label, value, helper }) {
	return (
		<div className="relative overflow-hidden rounded-2xl border border-[rgba(222,209,190,0.9)] bg-[#fffaf3] p-5 shadow-[0_16px_40px_rgba(62,52,33,0.1)] transition-transform duration-200 hover:-translate-y-1 dark:border-[rgba(87,82,74,0.9)] dark:bg-[#1f2127] dark:shadow-[0_16px_40px_rgba(5,7,12,0.35)]">
			<div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d96b2c] to-[#f0b478]" />
			<span className="text-xs uppercase tracking-[0.2em] text-[#6d6255] dark:text-[#9f9486]">{label}</span>
			<p className="mt-3 font-['Space_Grotesk'] text-3xl font-bold text-[#1b1a17] dark:text-[#f6efe4]">
				{value}
			</p>
			{helper ? (
				<span className="text-xs text-[#7a6f62] dark:text-[#c2b8aa]">{helper}</span>
			) : null}
		</div>
	)
}

export default StatCard
