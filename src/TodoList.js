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
    }

    addItem(instance) {
        if (this._inputElement.value !== "") {
            const items = this.state.items;
            let newItem = {
                text: this._inputElement.value,
                key: Date.now(),
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
                <TodoItems entries={this.state.items}/>
            </div>
        );
    }
}

export default TodoList;