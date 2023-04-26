import React, { useEffect, useState } from "react"
import { deleteGame, getGames } from "../../managers/GameManager.js"
import { Link, useNavigate } from "react-router-dom"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const [renderSwitch, setRenderSwitch] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [renderSwitch])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/games/new" })
            }}>Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.name} by {game.creator?.full_name}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <div>A {game.game_type?.name}</div>
                        <Link to={`/games/update/${game.id}`}>Update</Link>
                        <button onClick={
                        () => {
                            if (window.confirm("are you sure?")) {
                                deleteGame(game.id).then(() => setRenderSwitch(!renderSwitch))
                        }}}>Delete</button>
                    </section>
                })
            }
        </article>
    )
}