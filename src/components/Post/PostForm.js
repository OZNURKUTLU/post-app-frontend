import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import MuiAlert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { InputAdornment } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { PostWithAuth, PutWithAuth } from "../../services/HttpService";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
        textAlign: "left",
        margin: 20,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  
        borderRadius: 8,
    },
    avatar: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
    input: {
        marginBottom: 10,
        minHeight: 100,  
    },
    button: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        color: 'white',
        borderRadius: 20,
        padding: '8px 16px',  
        minWidth: 120,  
        '&:hover': {
            background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)', 
        }
    }
}));

function PostForm({ userId, userName, refreshPosts, editingPost, setEditingPost }) {
    const classes = useStyles();
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState(false);

   
    useEffect(() => {
        if (editingPost) {
            setTitle(editingPost.title);
            setText(editingPost.text);
        } else {
            setTitle("");
            setText("");
        }
    }, [editingPost]);

    const savePost = () => {
        if (!title.trim() || !text.trim()) {
            setError(true);
            return;
        }

        const postData = { title: title, userId: userId, text: text };

      
        if (editingPost) {
            PutWithAuth(`/posts/${editingPost.id}`, postData)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error("Post güncellenemedi!");
                    }
                })
                .then(() => {
                    setIsSent(true);
                    setEditingPost(null);
                    refreshPosts();
                })
                .catch((err) => {
                    console.error(err);
                    setError(true);
                });
        } else {
          
            PostWithAuth("/posts", postData)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error("Post gönderilemedi!");
                    }
                })
                .then(() => {
                    setIsSent(true);
                    setTitle("");
                    setText("");
                    refreshPosts();
                })
                .catch((err) => {
                    console.error(err);
                    setError(true);
                });
        }
    };

    const handleSubmit = () => {
        savePost();
    };

    return (
        <div>
            <Snackbar open={isSent} autoHideDuration={1200} onClose={() => setIsSent(false)}>
                <Alert severity="success"> {editingPost ? "Post güncellendi!" : "Post gönderildi!"} </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={1200} onClose={() => setError(false)}>
                <Alert severity="error"> Bir hata oluştu, lütfen tekrar deneyin. </Alert>
            </Snackbar>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Link to={{ pathname: '/users/' + userId }}>
                            <Avatar className={classes.avatar}>{userName.charAt(0).toUpperCase()}</Avatar>
                        </Link>
                    }
                    title={
                        <OutlinedInput
                            placeholder="Başlık"
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        <OutlinedInput
                            className={classes.input}
                            multiline
                            placeholder="Paylaşımınızı yazın"
                            inputProps={{ maxLength: 550 }}
                            fullWidth
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        className={classes.button}
                                        onClick={handleSubmit}
                                        disabled={!title.trim() || !text.trim()}
                                    >
                                        {editingPost ? "GÜNCELLE" : "PAYLAŞ"}
                                    </Button>
                                </InputAdornment>
                            }
                        />
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default PostForm;
