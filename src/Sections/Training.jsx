import ChartCard from '../components/ChartCard'
import { trainingPreferences } from '../mock/mockdata'

function Training() {
  return (
    <section className="space-y-4 rounded-xl bg-white p-6 shadow dark:bg-gray-800">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-['Space_Grotesk'] text-xl font-semibold text-[#1b1a17] dark:text-[#f6efe4]">
          Training Preferences
        </h2>
        <span className="text-sm text-[#6b6154] dark:text-[#c2b8aa]">When and how learning should happen</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ChartCard
          title="Delivery Type"
          subtitle="Preferred training format"
          data={trainingPreferences.deliveryType}
        />
        <ChartCard
          title="Preferred Time"
          subtitle="Best time slots"
          data={trainingPreferences.preferredTime}
        />
        <ChartCard
          title="Frequency Preference"
          subtitle="Cadence expectations"
          data={trainingPreferences.frequency}
        />
        <ChartCard
          title="Top Requested Topics"
          subtitle="Most demanded content"
          data={trainingPreferences.topTopics}
        />
      </div>
    </section>
  )
}

export default Training
