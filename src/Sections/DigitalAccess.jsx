import ChartCard from '../components/ChartCard'
import { digitalAccess } from '../mock/mockdata'

function DigitalAccess() {
  return (
    <section className="space-y-4 rounded-xl bg-white p-6 shadow dark:bg-gray-800">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-['Space_Grotesk'] text-xl font-semibold text-[#1b1a17] dark:text-[#f6efe4]">
          Internet & Platform Usage
        </h2>
        <span className="text-sm text-[#6b6154] dark:text-[#c2b8aa]">Access methods and training platforms</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ChartCard
          title="Internet Access Methods"
          subtitle="Multi-select response counts"
          data={digitalAccess.internetAccess}
        />
        <ChartCard
          title="Training Platforms Used"
          subtitle="Most used learning channels"
          data={digitalAccess.trainingPlatforms}
        />
      </div>
    </section>
  )
}

export default DigitalAccess
