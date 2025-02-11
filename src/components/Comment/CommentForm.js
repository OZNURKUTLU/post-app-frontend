import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, InputAdornment, OutlinedInput, Avatar, Button } from "@material-ui/core";
import { PostWithAuth, RefreshToken } from "../../services/HttpService";

const useStyles = makeStyles((theme) => ({
    comment: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "white",
    },
}));

function CommentForm({ userId, userName, postId, setCommentRefresh }) {
    const classes = useStyles();
    const [text, setText] = useState("");
    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        history.go(0);
    };

    const saveComment = () => {
        if (!text.trim()) return; // Boş yorumları engelle
        
        PostWithAuth("/comments", { postId, userId, text })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return RefreshToken()
                        .then((refreshRes) => {
                            if (!refreshRes.ok) logout();
                            return refreshRes.json();
                        })
                        .then((result) => {
                            if (result) {
                                localStorage.setItem("tokenKey", result.accessToken);
                                saveComment(); // Tekrar dene
                            }
                        });
                }
            })
            .catch((err) => console.error("Comment error:", err));
    };

    const handleSubmit = () => {
        saveComment();
        setText("");
        setCommentRefresh();
    };

    return (
        <CardContent className={classes.comment}>
            <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 250 }}
                fullWidth
                onChange={(e) => setText(e.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Link className={classes.link} to={`/users/${userId}`}>
                            <Avatar aria-label="recipe" className={classes.small}>
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <Button
                            variant="contained"
                            style={{
                                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                                color: "white",
                            }}
                            onClick={handleSubmit}
                            disabled={!text.trim()} // Boş yorum engelleme
                        >
                            Yorum yap
                        </Button>
                    </InputAdornment>
                }
                value={text}
                style={{ color: "black", backgroundColor: "white" }}
            />
        </CardContent>
    );
}

export default CommentForm;
