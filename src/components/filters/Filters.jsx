import FilterByName from "./FilterByName"
import FilterBySpecie from "./FilterBySpecie"
import FilterByStatus from "./FilterByStatus"

function Filters({ onChangeName, onChangeSpecie, onChangeStatus, onResetFilters, currentSpecie, currentStatus, currentName }) {

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <FilterByName onChangeName={onChangeName} currentName={currentName} />
            <FilterBySpecie onChangeSpecie={onChangeSpecie} currentSpecie={currentSpecie} />
            <FilterByStatus onChangeStatus={onChangeStatus} currentStatus={currentStatus}/>
            <button type="button" onClick={onResetFilters} className="reset-button">Reset</button>
        </form>
    )
}

export default Filters