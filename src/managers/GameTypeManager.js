export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
        headers: {
            "Authorization": `Token ${localStorage.getItem('lu_token')}`
        }
    })
        .then(res => res.json())
}