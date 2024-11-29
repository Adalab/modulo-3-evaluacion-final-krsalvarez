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
        .sort((a, b) => {
            return a.name.localeCompare(b.name); //localeCompare ordena cadenas y respeta idioma/mayus/minus
        });

    const resetFilters = () => {
        setFilterName("");
        setFilterSpecie("");
        setFilterStatus("");
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
            <Filters onChangeName={handleFilterName} onChangeSpecie={handleFilterSpecie} onChangeStatus={handleFilterStatus} onResetFilters={resetFilters} currentSpecie={filterSpecie} currentStatus={filterStatus} currentName={filterName}/>
            {filteredCharacters.length > 0 ? (
                <CharacterList users={filteredCharacters} />
            ) : (
                <p className="no-result">
                    No hay ningún personaje que coincida con la palabra "{filterName}"
                </p>
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
