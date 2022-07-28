import './employees-list-item.css';

const EmployeesListItem = (props) => {
    
    const { name, salary, onDelete, onToggleProp, increase, rise } = props;
        
    let liClass = 'list-group-item d-flex justify-content-between';
    if (increase) liClass += ' increase';
    if (rise) liClass += ' like';

    return (
        <li className={liClass}>
            <span data-toggle="rise" onClick={onToggleProp} className="list-group-item-label">{name}</span>
            <input type="text" defaultValue={salary + '$'} className="list-group-item-input" />
            <div className="d-flex justify-content-center align-items-center">
                <button data-toggle="increase" onClick={onToggleProp} type="button" className="btn-cookie btn-sm">
                    <i className="fas fa-cookie"></i>
                </button> 

                <button onClick={onDelete} type="button" className="btn-trash btn-sm">
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    );
}

export default EmployeesListItem;

