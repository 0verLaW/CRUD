import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list'
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [
                { name: 'John C.', salary: 800, increase: false, rise: true, id: 1 },
                { name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2 },
                { name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3 },
            ],
            term: '',
            filter:'all'
        };
        this.maxId = 4;
    }

    deleteItem = id => {
        this.setState(({ data }) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        if (name.length >= 3 && salary !== '') {
            const newItem = {
                name,
                salary,
                increase: false,
                rise: false,
                id: this.maxId++,
            }

            this.setState(({ data }) => {
                const newData = [...data, newItem];
                return {
                    data: newData,
                }
            })
        }
    }


    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) return {...item, [prop]: !item[prop]}
                return item;
            }) 
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) return items;
        return items.filter(item => {
            return new RegExp(term, 'i').test(item.name) === true;
        })
    }

    onUpdateSearch = (term) => {
        this.setState({ term });
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise === true);
            case 'over1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({ filter });
    }

    render() {
        const { term, data, filter } = this.state;
        const employees = data.length;
        const increased = data.filter(item => item.increase === true).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className='app'>
                <AppInfo employees={employees} increased={increased} />
                
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
                </div>
                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />
                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;