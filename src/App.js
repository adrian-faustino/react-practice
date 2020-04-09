import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() { // inside the constructor is where we can define state
    super(); // we use this line.. since we are extending Componenets which is provided by react, we do this so we can use all funcitonality

    this.state = { // all the state of our application is going to go in this object
      message: 'Hello Coding Garden!',
      newTodo: '',
      todos: []
    };
  }

  formSubmitted(event) { // here, to deal with the THIS issue we BIND it, see line 30
    event.preventDefault();
    console.log(this.state.newTodo);
    this.setState({
      newTodo: '',
      todos: [...this.state.todos, {
        title: this.state.newTodo,
        done: false
      }],
    });
  }

  newTodoChanged(event) { // if we want to be able to use the this of the component, we have to use fat arrow on line 33. ask mentor
    this.setState({
      newTodo: event.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
          <form onSubmit={this.formSubmitted.bind(this)}>
            <label htmlFor="newTodo">New Todo</label>
            <input onChange={(event) => this.newTodoChanged(event)} id="newTodo" name="newTodo" value={this.state.newTodo}/>
            <button type="submit">Add Todo</button>
          </form>

          <ul>
            {this.state.todos.map(todo => { // wouldnt the map here result in an array? so we have <ul> [array] </ul>.. how is this rendered?
              return <li key={todo.title}>{todo.title}</li>
            })}
          </ul>
      </div>
    );
  }
}

export default App;


// 3 different ways to bind this
// fat arrow function
// on the html just add .bind(this) line 30
// at the top, this.functName = this.functName.bind(this);

// KEY NOTES:
// We dont want to modify state like pushing into an array. We always want to make a new state
// because then React nows there's new state so it knows to update DOM
// WE WANT TO ALWAYS BE MAKING NEW ARRAYS so react knows to update DOM. So by using slice it copies new array
//  --> doing it this way, when we use setState, it's a new array. not the same array that's being pushed into
//  --> Think of how you can set a [] to const, you can change whatever is inside it but it's still []. We want to make new [] every time
// ALSO we are only updating todos instead of the WHOLE DOM when we setState({todo: ...etc}); It's the only key we are passing.