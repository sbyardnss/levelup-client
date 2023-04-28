import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getEvents, createEvent, getSingleEvent, updateEvent } from "../../managers/EventManager"
import { getGames } from "../../managers/GameManager"

export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const { eventId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        time: "",
        game: 0
    })

    useEffect(() => {

        getGames()
            .then(data => setGames(data))

        // TODO: Get the game types, then set the state
    }, [])
    useEffect(() => {
        if (eventId) {
            getSingleEvent(eventId)
            .then((data) => setCurrentEvent(data))
        }
    }, [eventId])
    console.log(currentEvent)
    const changeEventState = (domEvent) => {
        // if (domEvent.target.name === "numberOfPlayers" || domEvent.target.name === "gameTypeId" || domEvent.target.name === "skillLevel") {
        //     const eventCopy = { ...currentEvent }
        //     eventCopy[domEvent.target.name] = parseInt(domEvent.target.value)
        //     setCurrentEvent(eventCopy)
        // }
        // else {
            const eventCopy = { ...currentEvent }
            eventCopy[domEvent.target.name] = domEvent.target.value
            setCurrentEvent(eventCopy)

        // }
        // TODO: Complete the onChange function
    }
    
    return (
        <form className="gameForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input type="time"
                        name="time"
                        required autoFocus
                        value={currentEvent.time}
                        className="form-control"
                        onChange={changeEventState}></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select name="game"
                        className="form-control"
                        value={currentEvent.game}
                        onChange={changeEventState}>
                        <option value={0}>select game</option>
                        {
                            games.map(g => {
                                return <>
                                    <option key={g.title} value={g.id}>{g.title}</option>
                                </>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: parseInt(currentEvent.game)
                    }

                    // Send POST request to your API
                    if (eventId) {
                        updateEvent(event, eventId)
                        .then(() => navigate("/events"))
                    }
                    else {
                        createEvent(event)
                            .then(() => navigate("/events"))
                    }
                }}
                className="btn btn-primary">{eventId ? "update" : "create" }</button>
        </form>
    )
}