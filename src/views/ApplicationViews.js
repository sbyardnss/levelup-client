import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/event/EventList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/event/EventForm"

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<GameList />} />
                <Route path="/addGame" element={<GameForm />} />
                <Route path="/addGame/:gameId" element={<GameForm />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/addEvent" element={<EventForm />} />
                <Route path="/addEvent/:eventId" element={<EventForm />} />
            </Route>
        </Routes>
    </>
}
