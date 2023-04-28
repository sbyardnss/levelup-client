import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"
import { useNavigate } from "react-router-dom"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description} by {event.organizer.full_name}</div>
                        <div className="event__dateTime">{event.date} at {event.time}</div>
                        <div className="event__attendees">Currently {event.attendees} attending</div>
                        <button
                            onClick={() => navigate(`/addEvent/${event.id}`)}>Update Event</button>
                    </section>
                })
            }
        </article>
    )
}