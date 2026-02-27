import ChartCard from '../components/ChartCard'
import { participation } from '../mock/mockdata'

function Participation() {
  return (
    <section className="space-y-4 rounded-xl bg-white p-6 shadow dark:bg-gray-800">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-['Space_Grotesk'] text-xl font-semibold text-[#1b1a17] dark:text-[#f6efe4]">
          Participation Insights
        </h2>
        <span className="text-sm text-[#6b6154] dark:text-[#c2b8aa]">Intent, barriers, and motivations</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ChartCard
          title="Likelihood to Join"
          subtitle="Intent distribution"
          data={participation.likelihood}
        />
        <ChartCard
          title="Top Barriers"
          subtitle="Multi-select response counts"
          data={participation.barriers}
        />
        <ChartCard
          title="Motivation Drivers"
          subtitle="What pushes participation"
          data={participation.motivations}
        />
        <ChartCard
          title="Certification Impact"
          subtitle="Influence on decision"
          data={participation.certificationImpact}
          total={participation.certificationImpact.yes + participation.certificationImpact.no}
          variant="pie"
        />
      </div>
    </section>
  )
}

export default Participation
