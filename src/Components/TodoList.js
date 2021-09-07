import React, {useState, useEffect} from 'react'
import List from './List'


function TodoList() {
	const [task, setTask] = useState({})
	const [list, setList] = useState(localStorage.getItem('list') ? 
	JSON.parse(localStorage.getItem('list')) : [])
	const [id, setId] = useState(null)


	useEffect(() => {
		localStorage.setItem('list', JSON.stringify(list))
	}, [list])

	const handleChange = (e) => {
		setTask({
			...task,
			[e.target.name]: e.target.value
			})	
	}

		const handleClick = () => {
			const addItem = [...list]
			if (id) {
				const newItems = addItem.map(item => {
					if (item.id === id) {
					item.name = task?.name
					item.description = task?.description
					item.updatedTime = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
					}
					return item
				})
				setList(newItems)
				setId(null)
			} else {
				const taskObj = {
					id: new Date().toISOString(),
					name: task?.name,
					description: task?.description,
					status: 'todo',
					createdTime: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
					updatedTime: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
				}
				addItem.push(taskObj)
			}
			setList(addItem)
			setTask({
				name: '',
				description: ''
			})
		}

    return (
        <div>
        <input type='text' name="name" value={task.name} placeholder='Task Name' onChange={handleChange}/>
		<br /><br />
        <input type='text' name="description" value={task.description} placeholder='Description' onChange={handleChange}/>
					<br /><br />
					<button onClick={handleClick}>Submit</button><br /><br />
					<List
						todoList={list}
						prepareList={setList}
						setTask={setTask}
						setId={setId}
					/>

        </div>
    )
}

export default TodoList
