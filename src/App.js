import React, { useEffect, useState } from "react";

const getTodoListFromLS = () => {
  var list = localStorage.getItem('todoLists');

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
}

function App() {

  const [text, setText] = useState("");
  const [todos, setTodos] = useState(getTodoListFromLS());
  const [updateId, setUpdateId] = useState("");
  const [toggleSubmit, setToggleSubmit] = useState(true)

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Enter Details For Todos")
    }
    else if (text && !toggleSubmit) {
      setTodos(
        todos.map((val) => {
          if (val.id === updateId) {
            return { ...val, todo: text }
          }
          return val;
        })
      );
      setToggleSubmit(true);
      setText("");
      setUpdateId("");
    }
    else {
      const allData = { id: new Date().getMilliseconds(), todo: text, isChecked: false }
      setTodos([...todos, allData]);
      setText("");
    }
  }

  const updateTodo = (id) => {
    let editItem = todos.filter((val) => {
      return val.id === id
    });
    setText(editItem[0].todo);
    setUpdateId(id);
    setToggleSubmit(false)
  };

  const deleteTodo = (id) => {
    const temp = [...todos];
    var deleted = temp.filter((val) => {
      return val.id !== id
    });
    setTodos([...deleted])
  }

  const handleChecked = (id) => {
    let checkboxItem = todos.filter((val) => {
      return val.id === id
    });

    checkboxItem[0].isChecked === false ? checkboxItem[0].isChecked = true : checkboxItem[0].isChecked = false;
    setTodos([...todos])
  }

  useEffect(() => {
    localStorage.setItem('todoLists', JSON.stringify(todos))
  }, [todos]);

  return (
    <>
      <section className="w-screen h-[68px] shadow-md">
        <div className='container'>
          <div className='flex items-center justify-center'>
            <h1 className="font-semibold text-3xl py-3">Todo With CRUD</h1>
          </div>
        </div>
      </section>
      <section className="py-2">
        <div className="container">
          <div className="flex">
            <div className="shadow-lg rounded-lg flex flex-col col-12 col-sm-10 col-md-8 col-lg-6 m-auto p-2">
              <form className="w-full flex items-center gap-x-1" onSubmit={handleSubmit}>
                <input
                  placeholder="Enter Task Here ..."
                  type="text"
                  autoFocus
                  className={`${toggleSubmit ? "w-[80%]" : "w-[70%]"}  outline-none border-[1px] border-black h-8 rounded-md p-2`}
                  value={text}
                  onChange={handleChange}
                />
                {
                  toggleSubmit ?
                    <button className={`${toggleSubmit ? "w-[20%]" : "w-[30%]"} bg-purple-500 text-white uppercase py-1 rounded-md font-semibold hover:bg-purple-600`}>Add <i className="fa-solid fa-plus"></i></button> :
                    <button className={`${toggleSubmit ? "w-[20%]" : "w-[30%]"} bg-green-500 text-white uppercase py-1 rounded-md font-semibold hover:bg-green-600`}>Update <i className="fa-solid fa-plus"></i></button>
                }
              </form>
              <div className="mt-3 flex flex-col">
                <h2 className="text-left font-medium text-muted mb-3">{todos.length > 0 ? "Your Todos" : "No Todos To Show ! Please Add Todos"}</h2>
                <div className={`${todos.length > 0 ? "block" : "hidden"}`}>
                  {
                    todos.map((val, ind) => {
                      return (
                        <div key={ind} className="flex justify-between items-center p-2 mb-2 bg-gray-100 hover:bg-purple-500 hover:text-white rounded-md">
                          <div className="flex">
                            <input type="checkbox" onClick={() => handleChecked(val.id)} checked={val.isChecked} />&nbsp;
                            <p style={{ textDecorationLine: val.isChecked ? "line-through" : "none" }} className={`text-lg font-semibold`}>{ind + 1} . {val.todo}</p>
                          </div>
                          <div className="flex gap-x-2">
                            <i className="fa-solid fa-pen-to-square fa-lg hover:text-green-800" title="Update Todo" onClick={() => updateTodo(val.id)}></i>
                            <i className="fa-solid fa-trash fa-lg hover:text-red-700" title="Delete Todo" onClick={() => deleteTodo(val.id)}></i>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <button className={`${todos.length > 0 ? "block" : "hidden"}  bg-red-600 text-white px-2 py-1 rounded-md w-[50%] m-auto my-3`} onClick={() => setTodos([])}>Remove All Todos</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
