import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, View } from 'react-native';

function App() {
  const [getMessage, setGetMessage] = useState({})
  const [values, setValues] = useState([])

  //do this all the time
  useEffect(()=>{
    axios.get('https://secure-dusk-68936.herokuapp.com/returnlist').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
      console.log(response)
      setValues(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  //delete function
  function deleteTodo(name) {
    axios.post('https://secure-dusk-68936.herokuapp.com/deleteitem', {
      name: name
    }).then(response => {
      console.log(response);
      window.location.reload()
    }).catch(error => {
      console.log(error)
    })
  }

  //making a new todolist item
  var addThisTodo
  function addTodo() {
    addThisTodo = document.getElementById('addThisTodo')
    if ( !addThisTodo.value.trim().length) {
      alert("There is nothing in that text box!")
    } else {
      axios.post('https://secure-dusk-68936.herokuapp.com/addtolist', {
        name: addThisTodo.value,
        status: "NOTDONE"
      }).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error)
      })
    }
  }

  return (
    <html>
    <head>
      <title>Dave's Todo List</title>
    </head>
    <body>
      <center>
        <h1>Dave's Todo List</h1>
        <form>
          <div>
            <label>Enter something that you have to do:</label>
            <input type = "text" name = "text" id="addThisTodo"/>
            <input type="submit" value = "Add" onClick = {() => addTodo()}/>
          </div>
        </form>
        <div>{getMessage.status === 200 ? 
          <div>
              {values.map(value => 
                <View>
                  <button onClick={() => deleteTodo(value.name)}>
                     <Text>
                      {value.name}
                   </Text>
                </button>
              </View>)}
          </div>
          :
            <h3>LOADING</h3>}
        </div>
      </center>
    </body>
    </html>
  );

}
export default App;