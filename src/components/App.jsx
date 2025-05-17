import "../scss/App.scss";
import CharacterList from "./CharacterList";
import Filters from "./filters/Filters";
import getCharactersFromApi from "../services/getCharactersFromApi.js";
import Header from "./Header.jsx";
import CharacterDetail from "./CharacterDetail.jsx";

import { useEffect, useState } from "react";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";

function App() {

    const [users, setUsers] = useState([]);
    const [filterName, setFilterName] = useState("");
    const [filterSpecie, setFilterSpecie] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterEpisodes, setFilterEpisodes] = useState("");

    useEffect(() => {
        getCharactersFromApi().then((usersData) => {
            setUsers(usersData);
        });
    }, [])

    const handleFilterName = (valueInput) => {
        setFilterName(valueInput);
    }
    const handleFilterSpecie = (value) => {
        setFilterSpecie(value);
    }
    const handleFilterStatus = (valueStatus) => {
        setFilterStatus(valueStatus);
    }
    const handleFilterEpisodes = (valueInput) => {
        setFilterEpisodes(valueInput);
    }

    const filteredCharacters = users
        .filter((user) => {
            return user.name.toLowerCase().includes(filterName.toLowerCase());
        })
        .filter((user) => {
            return filterSpecie === "" ? true : user.species === filterSpecie;
        })
        .filter((user) => {
            return filterStatus === "" ? true : user.status === filterStatus;
        })
        .filter((user) => {
            return filterEpisodes === "" ? true : user.episode.length === Number(filterEpisodes);
        })
        .sort((a, b) => {
            return a.name.localeCompare(b.name); //localeCompare ordena cadenas y respeta idioma/mayus/minus
        });

    const resetFilters = () => {
        setFilterName("");
        setFilterSpecie("");
        setFilterStatus("");
        setFilterEpisodes("");
    }

    const { pathname } = useLocation();
    const routeData = matchPath("/character/:idCharacter", pathname);
    const urlId = routeData !== null ? routeData.params.idCharacter : null;
    const user = users.find((user) => {
        return user.id === Number(urlId); //no enseñaba nada porque no era un numero
    })


    return (
        <>
            <Header />
        <main>
            <Routes>
                <Route path="/" element={(
            <>
            <Filters onChangeName={handleFilterName} 
            onChangeSpecie={handleFilterSpecie} 
            onChangeStatus={handleFilterStatus}
            onChangeEpisodes={handleFilterEpisodes} 
            onResetFilters={resetFilters} 
            currentSpecie={filterSpecie} 
            currentStatus={filterStatus} 
            currentName={filterName} 
            currentEpisodes={filterEpisodes}/>

            {filteredCharacters.length > 0 ? (
                <CharacterList users={filteredCharacters} />
            ) : (

                <div className="no-result-div"><p className="no-result">
                    No hay ningún personaje que coincida con 
                    {filterName !== "" && ` el nombre: "${filterName}"`}
                    {filterSpecie !== "" && ` la especie: "${filterSpecie}"`}
                    {filterStatus !== "" && ` su estado: "${filterStatus}"`}
                    {filterEpisodes !== "" && ` episodios en los que aparece: ${filterEpisodes}`}
                </p>
                <img src="https://i.imgur.com/UKa6hST.png" className="no-person-img"/></div>
            )}
            </>

        )} />
            <Route path="/character/:idCharacter" element={<CharacterDetail user={user} />} />
            </Routes>
        </main>
        </>
    )
}

export default App
