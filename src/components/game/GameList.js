import React, { useEffect, useState } from "react"
import { deleteGame, getGames } from "../../managers/GameManager.js"
import { useNavigate } from "react-router-dom"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const [ render, setRender ] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [render])

    return (
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button
                            onClick={() => navigate(`/addGame/${game.id}`)}>Update Game</button>
                        <button
                            onClick={() => deleteGame(game.id).then(() => setRender(!render))}>Delete</button>

                    </section>
                })
            }
        </article>
    )
}