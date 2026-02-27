import ChartCard from '../components/ChartCard'
import { awareness } from '../mock/mockdata'

function Awareness() {
  return (
    <section className="space-y-4 rounded-xl bg-white p-6 shadow dark:bg-gray-800">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-['Space_Grotesk'] text-xl font-semibold text-[#1b1a17] dark:text-[#f6efe4]">
          Awareness & Outreach
        </h2>
        <span className="text-sm text-[#6b6154] dark:text-[#c2b8aa]">How people learn about YNE</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <ChartCard
          title="Heard About YNE"
          subtitle="Overall awareness rate"
          data={awareness.heardAboutYNE}
          total={awareness.heardAboutYNE.yes + awareness.heardAboutYNE.no}
          variant="pie"
        />
        <ChartCard
          title="Awareness Channels"
          subtitle="Multi-select response counts"
          data={awareness.awarenessChannels}
        />
        <ChartCard
          title="Telegram Penetration"
          subtitle="Telegram usage among respondents"
          data={awareness.telegramUsers}
          total={awareness.telegramUsers.yes + awareness.telegramUsers.no}
          variant="pie"
        />
      </div>
    </section>
  )
}

export default Awareness
