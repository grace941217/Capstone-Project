import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DateTime } from "luxon";


function UserPostCard({post, renderPosts, setRenderPosts, currentUser, updatePost, deletePost, renderEditForm, setRenderEditForm}) {
    const {id, content, image, user, like, comments, created_at, updated_at } = post
    const [isEditing, setEditing] = useState(false);
    // const [renderPosts, setRenderPosts] = useState({})
    // const [newContent, setNewContent] = useState('');
    // console.log(currentUser.posts)
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])



    const [formData, setFormData] = useState({
        content:'',
        image:'',
    })

    // useEffect(() => {
    //     fetch(`/posts/${id}`)
    //     .then(res => res.json())
    //     .then(setFormData)
    // },[id])
        
    // const handleChange = (e) => {
    //     const { name, value } = e.target
    //     setFormData({ ...formData, [name]: value })
    // }

    function handleChange(e) {
        setFormData({content: e.target.value});
        }

    function onSubmit(e){
        e.preventDefault();
        fetch(`/posts/${id}`,{
        method:'PATCH',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(() => {
            setRenderEditForm(!renderEditForm)
            setEditing(false);

        })

        // .then(data => {
        //     updatePost(data);
        //     // setNewContent("");
        //     setEditing(false);
        // });
            // navigate(`/users/:id`)
    }

    function handleDelete(e) {
        e.preventDefault();
        fetch(`/posts/${id}`,{
        method:'DELETE'
        })
        .then(() => setRenderPosts(!renderPosts))

        // .then((r) => r.json())
        // .then((data) => deletePost(data))
        //  navigate(`/users/${id}/posts`)
        // window.location.reload();
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={onSubmit}>
            <div className="form-group">
                <h2 className="post-input" htmlFor={id}>
                    {content}
                </h2>
                
                <input 
                    id={id} 
                    className="edit-input" 
                    type="text" 
                    value={formData.content}
                    onChange={handleChange}/>
            </div>
            <div className="btn-group">
                <button type="submit" onClick={onSubmit} className="save-button">
                    Save
                    <span className="visually-hidden"></span>
                </button>
                <button
                    type="button"
                    className="save-button"
                    onClick={() => setEditing(false)}
                    >
                    Cancel
                    <span className="visually-hidden"></span>
                </button>
            </div>
        </form>
        );

        const viewTemplate = (
            <div className="stack-small">
                <div className="c-cb">
                    <h2 className="post-input" htmlFor={id}>
                    {content}
                    </h2>
                    <h6 className="time-stamp">
                        {DateTime
                            .fromISO(updated_at)
                            .setZone("EST")
                            .toLocaleString(DateTime.DATETIME_MED)}
                    </h6>
                </div>
                <div className="btn-group">
                    <button 
                        type="button" 
                        className="comment-button" 
                        onClick={() => setEditing(true)}>
                        Edit <span ></span>
                    </button>
                    <button
                        type="button"
                        className="comment-button"
                        onClick={handleDelete}>
                        Delete <span ></span>
                    </button>
                </div>
            </div>
        );
    
    return (
        <>
        <div>
            {post ? 
            (<div className="user-post">{isEditing ? editingTemplate : viewTemplate}</div>)
            : (<h2> Post Something! </h2>) }
        </div>
        </>
    )
}

export default UserPostCard