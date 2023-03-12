import React, {useState, useEffect} from 'react'
// import axios from 'axios'
import { useNavigate, useParams} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import API from '../../api/api'
export default function EditNote({match}) {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
        id: ''
    })
    const navigate = useNavigate();
    let { id } = useParams(); 
    useEffect(() =>{
        const getNote = async () =>{
            const token = localStorage.getItem('tokenStore')
            if(id){
                const res = await API.get(`/api/notes/${id}`, {
                    headers: {Authorization: token}
                })
                setNote({
                    title: res.data.title,
                    content: res.data.content,
                    date: new Date(res.data.date).toLocaleDateString(),
                    id: res.data._id
                })
            }
        }
        getNote()
    },[id])

    const onChangeInput = e => {
        const {name, value} = e.target;
        setNote({...note, [name]:value})
    }


    const editNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title, content, date, id} = note;
                const newNote = {
                    title, content, date
                }

                await API.put(`/api/notes/${id}`, newNote, {
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
            <form onSubmit={editNote} autoComplete="off">
                <h2>Edit Note</h2>
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