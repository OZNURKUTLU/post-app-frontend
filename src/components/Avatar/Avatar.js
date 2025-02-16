import {React, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {ListItem, List, ListItemSecondaryAction, Radio} from '@material-ui/core';
import { PutWithAuth } from '../../services/HttpService';
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin: 50
    },
    modal: {
      display: "flex",
      maxWidth: 200,
    },
  });

function Avatar(props) {
  const {avatarId, userId, userName} = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(avatarId);


    const saveAvatar = () => {
      PutWithAuth("/users/" + localStorage.getItem("currentUser"), {
        avatar: selectedValue,
      })
        .then((res) => {
          if (res.ok) {          
            return res.json();   
          } else {
            console.log("Bir hata oluştu! Hata kodu:", res.status);
          }
        })
        .catch((err) => console.log(err));
    };


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    saveAvatar();
  };

  return (
    <div>
    <Card className={classes.root}>
        <CardMedia
          component="img"
          alt="User Avatar"
          image={`/avatars/avatar${selectedValue}.png`}
          title="User Avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {userName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           Hesap Bilgileri
          </Typography>
        </CardContent>
      <CardActions style={{ display: 'flex', justifyContent: 'left', width: '100%' }}>
        {localStorage.getItem("currentUser") === userId ? <Button size="small" color="primary"  onClick={handleOpen}>
     AVATARI DEĞİŞTİR
        </Button> : ""}
      </CardActions>
    </Card>
    <Modal
  className={classes.modal}
  open={open}
  onClose={handleClose}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>
  <div style={{ maxHeight: 300, overflowY: "auto", background: "white", padding: 10 }}>
    <List dense>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((key) => {
        const labelId = `checkbox-list-secondary-label-${key}`;
        return (
          <ListItem key={key} button>
            <CardMedia
              style={{ maxWidth: 100 }}
              component="img"
              alt={`Avatar n°${key}`}
              image={`/avatars/avatar${key}.png`}
              title="Avatar"
            />
            <ListItemSecondaryAction>
              <Radio
                edge="end"
                value={key}
                onChange={handleChange}
                checked={"" + selectedValue === "" + key}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  </div>
</Modal>
    </div>
  );
}

export default Avatar;
