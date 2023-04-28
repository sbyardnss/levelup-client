import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame } from '../../managers/GameManager.js'
import { getGameTypes } from "../../managers/GameTypeManager.js"

export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: 1,
        number_of_players: 0,
        title: "",
        maker: "",
        game_type: 0
    })

    useEffect(() => {

        getGameTypes()
            .then(data => setGameTypes(data))

        // TODO: Get the game types, then set the state
    }, [])

    const changeGameState = (domEvent) => {
        if (domEvent.target.name === "numberOfPlayers" || domEvent.target.name === "gameTypeId" || domEvent.target.name === "skillLevel") {
            const gameCopy = { ...currentGame }
            gameCopy[domEvent.target.name] = parseInt(domEvent.target.value)
            setCurrentGame(gameCopy)
        }
        else {
            const gameCopy = { ...currentGame }
            gameCopy[domEvent.target.name] = domEvent.target.value
            setCurrentGame(gameCopy)

        }
        // TODO: Complete the onChange function
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="num_of_players">Number of players:</label>
                    <input type="number"
                        name="numberOfPlayers"
                        required autoFocus
                        className="form-control"
                        onChange={changeGameState}></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill level:</label>
                    <input type="number"
                        name="skillLevel"
                        required autoFocus
                        className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select name="gameTypeId"
                        className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}>
                        <option value={0}>select game type</option>
                        {
                            gameTypes.map(gt => {
                                return <>
                                    <option key={gt.label} value={gt.id}>{gt.label}</option>
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

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}