function FilterByEpisodes({ onChangeEpisodes, currentEpisodes }) {

    const handleChange = (ev) => {
        onChangeEpisodes(ev.target.value);
    }

    return (
        <div className="input">
            <label htmlFor="episodes" className="label">¿En cuántos capítulos ha salido?</label>
            <input
                type="number"
                value={currentEpisodes}
                id="episodes"
                onChange={handleChange}
                className="user-input"
                placeholder="Ej: 5"
                min="1"
            />
        </div>
    )
}

export default FilterByEpisodes;