import { DateTime, Interval } from "luxon"
import { useMemo } from "react"
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

  const groupedEvents = useMemo(
    () =>
      availability.reduce<GroupedEvents>((acc, event) => {
        const dt = DateTime.fromISO(event.start?.dateTime || "")
        const day = dt.startOf("day").toString()

        if (Object.hasOwn(acc, day)) {
          acc[day].push(event)
        } else {
          acc[day] = [event]
        }

        return acc
      }, {}),
    [availability]
  )

  return (
    <fieldset>
      <legend>Book a call</legend>
      {errors.eventId && (
        <p className={s.error}>{errors.eventId.message?.toString()}</p>
      )}

      {Object.entries(groupedEvents).map(([day, eventsOnThisDay]) => (
        <fieldset key={day}>
          <legend>
            {DateTime.fromISO(day).toLocaleString({
              month: "short",
              day: "numeric",
              weekday: "short",
            })}
          </legend>
          {eventsOnThisDay.map(event => {
            const start = DateTime.fromISO(event.start?.dateTime || "")
            const end = DateTime.fromISO(event.end?.dateTime || "")
            const duration = Interval.fromDateTimes(start, end)

            return (
              <div key={event.id}>
                <input
                  type="radio"
                  value={event.id || ""}
                  id={event.id || ""}
                  {...register("eventId")}
                />
                <label htmlFor={event.id || ""}>
                  {start.toLocaleString({
                    timeStyle: "short",
                  })}{" "}
                  ({duration.length("minutes")}m)
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
