import UserPostCard from './UserPostCard'
import { useNavigate } from 'react-router-dom'

// import {useState} from 'react';


function UserPost({currentUser, updatePost, posts}) {
    // const {id, username, first_name, last_name, photo} = currentUser
    console.log(posts)
    const navigate = useNavigate()

    // const [imgSrc, setImgSrc] = useState("Invalid Image Source");

    function handleBack() {
        navigate("/")
    }

    return (
        <>
        <button onClick={handleBack}>Back</button>
        <div>
            {/* <p>Username : {username}</p>
            <img src={imgSrc} onError = {() => setImgSrc("https://i.pinimg.com/564x/20/0d/72/200d72a18492cf3d7adac8a914ef3520.jpg")} />
            <p>First Name : {first_name}</p>
            <p>Last Name : {last_name}</p>
            <p></p> */}
            <h2>Posts </h2>
                <div>{posts && posts.filter(post => post.user_id === currentUser.id)
                .map(post => <UserPostCard key={post.id} name={post.name} post={post} currentUser={currentUser} updatePost={updatePost} />)}</div>
                
        </div>
        </>
    )
}

export default UserPost