import React, { Component } from "react";
import "./TodoList.css";
import TodoItems from "./TodoItems";

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
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

    deleteItem(key) {
        const items = this.state.items;
        let newItems = items.filter(function (item) {
            let flag = item.key !== key
            if (!item.isDone && !flag)
            {
                item.isDone = true;
                return !flag
            }
            return flag

        });

        this.setState({
            items: newItems,
        });
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

                </div>
                <TodoItems entries={this.state.items}
                           delete={this.deleteItem}/>
            </div>
        );
    }
}

export default TodoList;