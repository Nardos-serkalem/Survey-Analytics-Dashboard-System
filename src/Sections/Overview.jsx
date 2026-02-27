import StatCard from '../components/StatCard'
import { overview } from '../mock/mockdata'

function Overview() {
	return (
		<section className="space-y-4">
			<div className="flex flex-wrap items-end justify-between gap-3">
				<h2 className="font-['Space_Grotesk'] text-xl font-semibold text-[#1b1a17] dark:text-[#f6efe4]">
					Executive Overview
				</h2>
				<span className="text-sm text-[#6b6154] dark:text-[#c2b8aa]">
					Last Updated: Static Mock Data
				</span>
			</div>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard
					label="Total Respondents"
					value={overview.totalRespondents}
					helper="All valid surveys"
				/>
				<StatCard
					label="Awareness Rate"
					value={`${overview.awarenessRatePercent}%`}
					helper="Heard about YNE"
				/>
				<StatCard
					label="Likely to Join"
					value={`${overview.likelyToJoinPercent}%`}
					helper="Likely or very likely"
				/>
				<StatCard
					label="Telegram Users"
					value={`${overview.telegramUsersPercent}%`}
					helper="Active Telegram accounts"
				/>
			</div>
		</section>
	)
}

export default Overview
