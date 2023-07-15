import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {format} from 'timeago.js'
// import axios from 'axios'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import API from '../../api/api'

export default function Home() {
    const [notes, setNotes] = useState([])
    const [token, setToken] = useState('')

    const getNotes = async (token) =>{
        const res = await API.get('api/notes', {
            headers:{Authorization: token}
        })
        setNotes(res.data)
    }

    useEffect(() =>{
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if(token){
            getNotes(token)
        }
    }, [])

    const deleteNote = async (id) =>{
        try {
            if(token){
                await API.delete(`api/notes/${id}`, {
                    headers: {Authorization: token}
                })
                getNotes(token)
            }
        } catch (error) {
            window.location.href = "/";
        }
    }
    const handleBookmark = async (id) => {
        try {
            if (token) {
                await API.put(`api/notes/${id}/bookmark`, null , {
                        headers: { Authorization: token },
                    }
                );
                getNotes(token);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <div className="note-wrapper">
            {
                notes.map(note =>(
                    <div className="card" key={note._id}>
                        <h4 title={note.title}>{note.title}</h4>
                        <div className="text-wrapper">
                            <p>{note.content}</p>
                        </div>
                        <div className="card-footer">
                            <p className="date">{new Date(note.date).toLocaleString('en-IN', {
                                weekday: 'short',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })}</p>
                            <Link to={`edit/${note._id}`} ><EditIcon/></Link>
                        </div>
                        <button className="close" 
                        onClick={() => deleteNote(note._id)} ><DeleteForeverIcon/></button>
                        {note.bookmarked ? (
                            <button className="bookmark" onClick={() => handleBookmark(note._id)}><BookmarkIcon/></button>
                            ) : (
                            <button className="bookmark" onClick={() => handleBookmark(note._id)}><BookmarkBorderOutlinedIcon/></button>
                            )}
                    </div>
                ))
            }
        </div>
        </>
    )
}