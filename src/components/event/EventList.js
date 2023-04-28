import React, { useEffect, useState } from "react"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "../../managers/EventManager"
import { useNavigate } from "react-router-dom"

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const [render, setRender] = useState(false)
    
    const navigate = useNavigate()
    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [render])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description} by {event.organizer.full_name}</div>
                        <div className="event__dateTime">{event.date} at {event.time}</div>
                        <div className="event__attendees">Currently {event.attendees.length} attending</div>
                        {
                            event.joined ?
                                <button
                                    onClick={() => leaveEvent(event.id).then(() => setRender(!render))}>leave</button>
                                : <button
                                    onClick={() => joinEvent(event.id).then(() => setRender(!render))}>sign up</button>
                        }
                        <button
                            onClick={() => navigate(`/addEvent/${event.id}`)}>Update Event</button>
                        <button
                            onClick={() => deleteEvent(event.id).then(() => setRender(!render))}>Delete</button>
                    </section>
                })
            }
        </article>
    )
}