import Header from '../components/Header'
import StatCard from '../components/StatCard'
import Demographics from '../Sections/Demographics'
import Awareness from '../Sections/Awareness'
import DigitalAccess from '../Sections/DigitalAccess'
import Participation from '../Sections/Participation'
import Training from '../Sections/Training'
import { overview } from '../mock/mockdata'

function Dashboard({ isDark, onToggleTheme }) {
	return (
		<div className="space-y-10">
			<Header isDark={isDark} onToggleTheme={onToggleTheme} />

			<section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
			</section>

			<div className="rounded-2xl border border-[rgba(31,27,22,0.6)] bg-gradient-to-br from-[#1f1b16] to-[#2b241d] p-6 text-[#fff8ee] shadow-[0_20px_50px_rgba(17,12,6,0.35)] dark:border-[rgba(134,120,104,0.6)] dark:from-[#121315] dark:to-[#1d2026]">
				<h2 className="font-['Space_Grotesk'] text-lg font-semibold">Key Insights</h2>
				<ul className="mt-3 space-y-2 text-sm text-[#f3e7d7] dark:text-[#e9e2d7]">
					<li>Mobile data is the dominant internet access method.</li>
					<li>Career growth and certification drive participation intent.</li>
					<li>Evening sessions win with the largest share of respondents.</li>
				</ul>
			</div>

			<Demographics />
			<Awareness />
			<DigitalAccess />
			<Participation />
			<Training />

			<p className="text-sm text-[#6b6154] dark:text-[#c2b8aa]">
				Open feedback responses collected: {overview.openFeedbackResponses}.
				Qualitative answers are summarized in aggregate only.
			</p>
		</div>
	)
}

export default Dashboard
