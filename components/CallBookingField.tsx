import { DateTime } from "luxon"
import { useFormContext } from "react-hook-form"
import { Event } from "../types"
import s from "./Field.module.scss"

interface Props {
  availability: Event[]
}

interface GroupedEvents {
  [key: string]: Event[]
}

const CallBookingField = ({ availability }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const groupedEvents = availability.reduce<GroupedEvents>((acc, event, i) => {
    const day = event.start?.dateTime || "" // TODO: use luxon to extract date only

    if (acc.day) {
      acc[day].push(event)
    } else {
      acc[day] = [event]
    }

    return acc
  }, {})

  return (
    <fieldset>
      <legend>Book a call</legend>
      {errors.eventId && (
        <p className={s.error}>{errors.eventId.message?.toString()}</p>
      )}

      {Object.entries(groupedEvents).map(([day, eventsOnThisDay]) => (
        <fieldset key={day}>
          <legend>{day}</legend>
          {eventsOnThisDay.map(event => {
            const start = DateTime.fromISO(event.start?.dateTime || "")
            return (
              <div key={event.id}>
                <input
                  type="radio"
                  value={event.id || ""}
                  id={event.id || ""}
                  {...register("eventId")}
                />
                <label htmlFor={event.id || ""}>
                  {/* {start.toLocaleString({
                    month: "short",
                    day: "numeric",
                    weekday: "short",
                  })} */}
                  {start.toLocaleString({
                    timeStyle: "short",
                  })}
                </label>
              </div>
            )
          })}
        </fieldset>
      ))}
    </fieldset>
  )
}

export default CallBookingField
