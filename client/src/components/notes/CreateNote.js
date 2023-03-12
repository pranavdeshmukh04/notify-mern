import React, {useState} from 'react'
// import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import API from '../../api/api'
export default function CreateNote() {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: ''
    })
    const navigate = useNavigate()

    const onChangeInput = e => {
        const {name, value} = e.target;
        setNote({...note, [name]:value})
    }


    const createNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title, content, date} = note;
                const newNote = {
                    title, content, date
                }

                await API.post('/api/notes', newNote, {
                    headers: {Authorization: token}
                })
                
                return navigate('/')
            }
        } catch (err) {
            window.location.href = "/";
        }
    }

    return (
        <div className="create-note">
            
            <form onSubmit={createNote} autoComplete="off">
            <h2>Create Note </h2>
                <div className="row">
                    <TextField label="Title" variant="filled" value={note.title} id="title"
                    name="title" required onChange={onChangeInput} fullWidth/>
                </div>
                <div className="row">
                    <TextField
                        label="Content"
                        multiline
                        rows={7}
                        variant="filled"
                        value={note.content} id="content"
                        name="content" required onChange={onChangeInput}
                        fullWidth 
                    />
                </div>
                <div className="row date">
                    <input type="date" id="date"
                    name="date" onChange={onChangeInput} />
                </div>
                <div className="save-button">
                    <Button variant="outlined" type="submit" size="large" sx={{ borderColor: 'black', color: 'black' }}>Save</Button>
                </div>
            </form>
        </div>
    )
}