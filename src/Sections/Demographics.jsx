import ChartCard from '../components/ChartCard'
import { demographics } from '../mock/mockdata'

function Demographics() {
  return (
    <section className="space-y-4 rounded-xl bg-white p-6 shadow dark:bg-gray-800">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-['Space_Grotesk'] text-xl font-semibold text-[#1b1a17] dark:text-[#f6efe4]">
          Demographics Overview
        </h2>
        <span className="text-sm text-[#6b6154] dark:text-[#c2b8aa]">498 respondents</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <ChartCard
          title="Gender Distribution"
          subtitle="Male vs Female"
          data={demographics.gender}
          total={demographics.totalRespondents}
          variant="pie"
        />
        <ChartCard
          title="Age Group Breakdown"
          subtitle="15 to 50 years"
          data={demographics.ageGroups}
          total={demographics.totalRespondents}
        />
        <ChartCard
          title="Subcity Distribution"
          subtitle="Addis Ababa coverage"
          data={demographics.subcity}
          total={demographics.totalRespondents}
        />
        <ChartCard
          title="Education Level"
          subtitle="Highest level completed"
          data={demographics.educationLevel}
          total={demographics.totalRespondents}
        />
        <ChartCard
          title="Employment Status"
          subtitle="Current primary status"
          data={demographics.employmentStatus}
          total={demographics.totalRespondents}
        />
        <ChartCard
          title="Area of Collection"
          subtitle="Where responses came from"
          data={demographics.areaOfCollection}
          total={demographics.totalRespondents}
        />
      </div>
    </section>
  )
}

export default Demographics
