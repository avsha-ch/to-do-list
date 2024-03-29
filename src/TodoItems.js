import React, { Component } from "react";
import FlipMove from "react-flip-move";

class TodoItems extends Component {
    constructor(props) {
        super(props);

        this.createTasks = this.createTasks.bind(this);
    }

    delete(item) {
        this.props.delete(item.key);
    }

    createTasks(item) {
        let classStatus = item.isDone ? "taskDone" : "task";
        // default event arg maintained while listening to user Click-on-task
        return <li className={classStatus} onClick={() => this.delete(item)}
                   key={item.key}>{item.text}</li>
    }

    render() {
        let todoEntries = this.props.search.length ? this.props.search : this.props.entries;
        //let todoSearch = this.props.search;
        // let listItems = (todoSearch && todoSearch.length) ?
        //                 todoEntries.map(this.createTasks) : todoSearch.map(this.createTasks);
        let listItems = todoEntries.map(this.createTasks);
        // let searchItems = todoSearch.map(this.createTasks);

        return (
            <ul className="listItems">
                <FlipMove duration={250} easing="ease-out">
                {listItems}
                </FlipMove>
            </ul>
        );
    }
};

export default TodoItems;