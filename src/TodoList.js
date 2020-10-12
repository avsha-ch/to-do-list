import React, { Component } from "react";
import "./TodoList.css";
import TodoItems from "./TodoItems";

class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            search: [],
        };
        this.addItem = this.addItem.bind(this);
        // this.searchItem = this.searchItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.componentDidMount = this.componentDidMount(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        this.setState({
            search: this.props.items
        });
    }

    handleChange(word) {
        // Variable to hold the original version of the list
        const items = this.state.items;
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (word !== "") {
            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = items.filter(item => {
                // change current item to lowercase
                const lc = item.text.toLowerCase();
                // change search term to lowercase
                const filter = word.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = [];
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            search: newList,
        });
    }

    addItem(instance) {
        if (this._inputElement.value !== "") {
            const items = this.state.items;
            let newItem = {
                text: this._inputElement.value,
                key: Date.now(),
                isDone: false,
            };
            // this.setState((lastState) => {
            //     return {
            //         items: lastState.items.concat(newItem)
            //     };
            // });
            this.setState({
                items: items.concat(newItem),
            });
            this._inputElement.value = "";
        }

        console.log(this.state.items);

        // so page wont reload after form is submitted
        instance.preventDefault();
    }

    taskFilterOnChange() {}

    // searchItem(instance)
    // {
    //     if (this._searchElement.value !== "")
    //     {
    //         const query = this._searchElement.value;
    //         const items = this.state.items;
    //         let newSearch = items.filter(function (item) {
    //             return item.text.startsWith(query);
    //         });
    //         this.setState({
    //             search: newSearch,
    //         });
    //     }
    //     else {
    //         this.setState({
    //             search: [],
    //         });
    //     }
    //
    //     console.log(this.state.search);
    //
    //     // so page wont reload after form is submitted
    //     instance.preventDefault();
    // }

    async deleteItem(key) {
        const items = this.state.items;
        // const search = this.state.search;
        let newItems = items.filter(function (item) {
            let flag = item.key !== key
            if (!item.isDone && !flag)
            {
                item.isDone = true;
                return !flag
            }
            return flag

        });
        // let newSearch = search.filter(function (item) {
        //     let flag = item.key !== key
        //     if (!item.isDone && !flag)
        //     {
        //         item.isDone = true;
        //         return !flag
        //     }
        //     return flag
        // });

        await this.setState({
            items: newItems,
        });
        console.log(this.state.items);
        this.handleChange(this._searchWord.value);

    }

    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input ref={(userInput) => this._inputElement = userInput}
                            placeholder="enter task">
                        </input>
                        <button type="submit">add</button>
                    </form>
                    <input type="text" className="search"
                           ref={(userInput) => this._searchWord = userInput}
                           onChange={e => this.handleChange(e.target.value)}
                           placeholder="search tasks"
                    />
                    {/*<form onKeyUp={this.searchItem}>*/}
                    {/*    <input ref={(userSearch) => this._searchElement = userSearch}*/}
                    {/*           placeholder="search task">*/}
                    {/*    </input>*/}
                    {/*</form>*/}
                </div>

                <TodoItems entries={this.state.items}
                           delete={this.deleteItem}
                           search={this.state.search}
                />
            </div>
        );
    }
}

export default TodoList;