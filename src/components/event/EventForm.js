import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGames } from "../../managers/GameManager"
import { createEvent, getEventById, updateEvent } from "../../managers/EventManager"



export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const { eventId } = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [newEventMade, setNewEvent] = useState({
        name: '',
        organizer: 0,
        description: "",
        date: "",
        game: 0,
        attendees:0    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGames().then((data) => {setGames(data)})
    }, [])
    useEffect(() => {
        if(eventId) {
            getEventById(eventId).then((data) => {setNewEvent(data)})
        }
    }, [eventId])
    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const newEvent = {...newEventMade}
        newEvent[domEvent.target.name] = domEvent.target.value
        setNewEvent(newEvent)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__name">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={newEventMade.name}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="organizer">Organizer: </label>
                    <input type="text" name="organizer" required autoFocus className="form-control"
                        value={newEventMade.organizer}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={newEventMade.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date and Time: </label>
                    <input type="date" name="date_and_time" required autoFocus className="form-control"
                        value={newEventMade.date_and_time}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select
                        name="gameId"
                        value={newEventMade.gameId}
                        onChange={changeGameState}>
                        <option value="0"> Choose a game</option>
                        {games.map((game) => {
                            return (
                            <option key={game.id} value={parseInt(game.id)}>
                                {game.name}
                            </option>
                            );
                        })}
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    if(eventId){
                        const updatedEvent = {
                            id: newEventMade.id,
                            organizer: newEventMade.organizer,
                            name: newEventMade.name,
                            description: newEventMade.description,
                            date_and_time: newEventMade.date_and_time,
                            game: newEventMade.game
                        }
                        console.log(updatedEvent)
                        updateEvent(updatedEvent).then(() => navigate("/events"))
                    } else {
                        const event = {
                            organizer: parseInt(newEventMade.organizer),
                            name: newEventMade.name,
                            description: newEventMade.description,
                            date_and_time: newEventMade.date_and_time,
                            game: parseInt(newEventMade.gameId),
                        }
                        createEvent(event)
                        .then(() => navigate("/events"))
                    }
                    
                
                }}
                className="btn btn-primary">{
                    eventId ? "Update" : "Create"
                    }</button>
        </form>
    )
}