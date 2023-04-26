import { useEffect, useState } from "react"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "../../managers/EventManager.js"
import { Link, useNavigate } from "react-router-dom"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const [renderSwitch, setRenderSwitch] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [renderSwitch])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/events/new" })
            }}>Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event_title">{event.name}</div>
                        <div className="organizer">Organized by {event.organizer?.full_name}</div>
                        <div className="attendees"> {event.description}</div>
                        <div className="date">On {event.date_and_time}</div>
                        <Link to={`/events/update/${event.id}`}>Update</Link>
                        <button onClick={
                        () => {
                            if (window.confirm("are you sure?")) {
                                deleteEvent(event.id).then(() => setRenderSwitch(!renderSwitch))
                        }}}>Delete</button>
                        {
                        event.joined ?
                        // TODO: create the Leave button
                        <button onClick={
                            () => {
                            leaveEvent(event.id).then(() => setRenderSwitch(!renderSwitch))}}>Leave</button>
                        :
                        // TODO: create the Join button
                        <button onClick={
                            () => {
                            joinEvent(event.id).then(() => setRenderSwitch(!renderSwitch))}}>Join</button>
                        }
                     
                    </section>
                }) 
            }
        </article>
    )
}