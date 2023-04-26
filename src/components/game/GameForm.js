import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createGame, getGameById, getGameTypes, updateGame } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const { gameId } = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })
    useEffect(() => {
        if(gameId) {
            getGameById(gameId).then((data) => {setCurrentGame(data)})
        }
    }, [gameId])
    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes().then((data) => {setGameTypes(data)})
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const newGame = {...currentGame}
        newGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__name">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="creator">Creator: </label>
                    <input type="text" name="creator" required autoFocus className="form-control"
                        value={currentGame.creator}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Game Type: </label>
                    <select
                        name="gameTypeId"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}>
                        <option value="0"> Choose a game type</option>
                        {gameTypes.map((gameType) => {
                            return (
                            <option key={gameType.id} value={parseInt(gameType.id)}>
                                {gameType.name}
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
                    if(gameId){
                       const updatedGame = {
                            creator: currentGame.creator,
                            name: currentGame.name,
                            number_of_players: currentGame.numberOfPlayers,
                            skill_level: currentGame.skillLevel,
                            game_type: currentGame.gameTypeId 
                        }
                        updateGame(updatedGame).then(() => navigate("/games"))
                    } else {
                    const game = {
                        creator: parseInt(currentGame.creator),
                        name: currentGame.name,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: currentGame.skillLevel,
                        game_type: parseInt(currentGame.gameTypeId)
                    }
                    createGame(game)
                    .then(() => navigate("/games"))
                }

                }}
                className="btn btn-primary">{
                gameId ? "Update" : "Create"
                }</button>
        </form>
    )
}