import React from 'react'

function List(props) {

    const onDelete = (id) => {
        const deleteItem = [...props.todoList]
        ?.filter(item => item.id !== id)
        props.prepareList(deleteItem)
    }

    const onEdit = (id) => {
        
        const editItem = [...props.todoList]
        ?.filter(item => item.id === id)[0]
        props.setTask({
            name: editItem?.name,
            description: editItem?.description,
        })
        props.setId(id)
    }

    const onStatusChange = (id) => {
        const copiedList = [...props?.todoList]
        const status = copiedList.map(item => {
            if(item.id === id) {
                item.status = item.status === 'todo'? 'doing' : 'done'
            }
            return item
        }
        )
        props.prepareList(copiedList)
    }

    const theList = ['todo', 'doing', 'done']

    return (
        <div style={{ display: 'flex', gap: "20px" }}>
            {theList.map(type => <div style={{ flex: 1 }} key={type} className={type}>
                {type}
                {props?.todoList?.map((item) => item.status === type &&
                <div style={{ padding: '20px', margin: '20px', border: '1px solid' }} key={item.id}>
                {item.name}
                {item.status !== 'done' && <button onClick={() => onStatusChange(item.id)}>Move</button>}
                {item.status === 'todo' && <button onClick={() => onEdit(item.id)}>Edit</button>}
                <button onClick={() => onDelete(item.id)}>Delete</button>
                <br />
                {item.description} 
                </div>)}
            </div>)}
        </div>
    )
}

export default List
