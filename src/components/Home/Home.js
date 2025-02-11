import React, { useState, useEffect } from "react";
import Post from '../Post/Post';
import { makeStyles } from '@material-ui/core/styles';
import PostForm from "../Post/PostForm";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#f0f5ff',
        minHeight: "100vh", 
        padding: "20px",
    },
    loading: {
        marginTop: "50px",
    },
    noPosts: {
        marginTop: "20px",
        fontSize: "18px",
        color: "#666",
    }
}));

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const [editingPost, setEditingPost] = useState(null); 
    const classes = useStyles();

    const refreshPosts = () => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                },
                (error) => {
                    console.log(error);
                    setIsLoaded(true);
                    setError(error);
                }
            );
    };

    useEffect(() => {
        refreshPosts();
    }, []);

    if (error) {
        return <div className={classes.container}> Hata !!!</div>;
    } 

    if (!isLoaded) {
        return (
            <div className={classes.container}>
                <CircularProgress className={classes.loading} />
            </div>
        );
    }

    return (
        <div className={classes.container}>
            {localStorage.getItem("currentUser") && (
                <PostForm 
                    userId={localStorage.getItem("currentUser")} 
                    userName={localStorage.getItem("userName")}  
                    refreshPosts={refreshPosts} 
                    editingPost={editingPost}  
                    setEditingPost={setEditingPost}  
                />
            )}
            {postList.length > 0 ? (
                postList.map(post => (
                    <Post  
                        key={post.id} 
                        likes={post.postLikes} 
                        postId={post.id} 
                        userId={post.userId} 
                        userName={post.userName}  
                        title={post.title} 
                        text={post.text} 
                        setEditingPost={setEditingPost} 
                    />
                ))
            ) : (
                <div className={classes.noPosts}>Henüz gönderi yok.</div>
            )}
        </div>
    );
}

export default Home;
