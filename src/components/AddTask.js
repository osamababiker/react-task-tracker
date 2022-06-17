import { useState } from 'react';

const AddTask = (props) => {
    const [text , setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder , setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if(!text){
            alert('please add a text');
        }

        props.onAdd({text, day, reminder});
        setText('');
        setDay('');
        setReminder(false);
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add Task" />
            </div>
            <div className="form-control">
                <label>Date & Time</label>
                <input type="text" value={day} onChange={(e) => setDay(e.target.value)} placeholder="Add time" />
            </div>
            <div className="form-control form-control-check">
                <label>Reminder</label>
                <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>
            <div className="form-control">
                <input type="submit" className="btn btn-block" value="Save task" />
            </div>
        </form>
    );
}

export default AddTask;