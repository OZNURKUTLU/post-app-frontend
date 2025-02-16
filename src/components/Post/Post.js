import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert'; 
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { PostWithAuth, DeleteWithAuth } from "../../services/HttpService";

const useStyles = makeStyles((theme) => ({
    root: {
      width: 800,
      textAlign : "left",
      margin : 20
    },
    avatar: {
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
    link: {
        textDecoration : "none",
        boxShadow : "none",
        color : "white"
    }
}));

function Post(props) {
   const {title, text, userId, userName, postId, likes, setEditingPost} = props;
   const classes = useStyles();
   const [expanded, setExpanded] = useState(false);
   const [commentList, setCommentList] = useState([]);
   const [isLiked, setIsLiked] = useState(false);
   const [likeCount, setLikeCount] = useState(likes.length);
   const [likeId, setLikeId] = useState(null);
   const [refresh, setRefresh] = useState(false);
   const [menuAnchor, setMenuAnchor] = useState(null); 
   let disabled = localStorage.getItem("currentUser") == null ? true : false;

   const setCommentRefresh = () => {
     setRefresh(true);
   }

   const handleExpandClick = () => {
     setExpanded(!expanded);
     refreshComments();
   };

   const handleLike = () => {
    setIsLiked(!isLiked);
    if(!isLiked){
      saveLike();
      setLikeCount(likeCount + 1)
    }
    else{
      deleteLike();
      setLikeCount(likeCount - 1)
    }
   }
   
   const refreshComments = () => {
    fetch("/comments?postId="+postId)
    .then(res => res.json())
    .then(
        (result) => setCommentList(result),
        (error) => console.log(error)
    );
    setRefresh(false);
 }

 const saveLike = () => {
  PostWithAuth("/likes", {
    postId: postId, 
    userId: localStorage.getItem("currentUser"),
  })
    .then((res) => res.json())
    .then((data) => setLikeId(data.id)) 
    .catch((err) => console.log(err));
};

const deleteLike = () => {
  if (likeId) {
    DeleteWithAuth("/likes/" + likeId)
      .then(() => setLikeId(null)) 
      .catch((err) => console.log(err));
  }
};

  const checkLikes = () => {
    var likeControl = likes.find((like =>  ""+like.userId === localStorage.getItem("currentUser")));
    if(likeControl != null){
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  }
  
  useEffect(() => {checkLikes()},[]);
  

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };


  const handleEdit = () => {
    setEditingPost({ id: postId, title, text });
    handleMenuClose();
  };


  const handleDelete = () => {
    DeleteWithAuth(`/posts/${postId}`)
      .then(() => {
        props.refreshPosts(); 
      })
      .catch((err) => console.log(err));
    handleMenuClose();
  };

   return (
           <Card className={classes.root}>
                <CardHeader
                    avatar={
                    <Link className={classes.link} to={{pathname : '/users/' + userId}}>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                    }
                    title={title}
                    action={
                      
                      (localStorage.getItem("currentUser") === userId.toString()) && (
                        <IconButton onClick={handleMenuOpen}>
                          <MoreVertIcon />
                        </IconButton>
                      )
                    }
                />
               
                <Menu
                    anchorEl={menuAnchor}
                    keepMounted
                    open={Boolean(menuAnchor)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleEdit}>Güncelle</MenuItem>
                    <MenuItem onClick={handleDelete}>Sil</MenuItem>
                </Menu>

                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={handleLike} aria-label="add to favorites" disabled={disabled}>
                        <FavoriteIcon style={isLiked ? { color: "red" } : null} />
                    </IconButton>
                    {likeCount}
                    <IconButton
                        className={clsx(classes.expand)}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <CommentIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed>
                    {commentList.map(comment => (
                        <Comment key={comment.id} userId={comment.userId} userName={comment.userName} text={comment.text} />
                    ))}
                    {!disabled && (
                        <CommentForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} postId={postId} setCommentRefresh={setCommentRefresh} />
                    )}
                    </Container>
                </Collapse>
           </Card>
   );
}

export default Post;
