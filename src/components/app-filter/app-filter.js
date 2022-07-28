import './app-filter.css';

const AppFilter = (props) => {

    const buttonsData = [
        { name: 'all', label: 'Все сотрудники' },
        { name: 'rise', label: 'На повышение' },
        { name: 'over1000', label: 'З/П больше 1000$' },
    ]

    const buttons = buttonsData.map(({ name, label }) => {
        const active = props.filter === name;
        const clazz = active ? 'btn-light' : 'btn btn-outline-light';
        return (
            <button
                onClick={() => props.onFilterSelect(name)}
                key={name}
                className={`btn ${clazz}`}
                type='button'>
                {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
        );
}

export default AppFilter;