
/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { Button, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Context from './Context';
import Gravatar from 'react-gravatar'
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

import Stack from '@mui/material/Stack';

import StarWarsImage from './icons/1.star-wars.jpeg';
import GhettoImage from './icons/2.ghetto.jpg';
import SquelettonImage from './icons/3.squeletton.jpeg';
import PikachuImage from './icons/4.pikachu.jpeg';
import LionImage from './icons/5.lion.jpeg';

import axios from 'axios';

const useStyles = (theme) => ({
  '.css-cnd76u-MuiPaper-root': {
    backgroundColor: '#2f435e',

  },
  root: {
    backgroundColor: '#2f435e',
    position: 'relative',
    flex: '1 1 auto',
    overflow: 'auto',
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  header: {
    padding: theme.spacing(1),
    height: '80px',
    backgroundColor: '#2f435e',
    flexShrink: 30,
    textAlign: 'center',
    marginBottom: 40,
  },
  headerLogIn: {
    backgroundColor: '#2f435e',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  }
})

export default function Header({
  drawerToggleListener
}) {
  const styles = useStyles(useTheme())
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible
  } = useContext(Context)

  const [userImage, setUserImage] = useState(0)
  
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }

  const getUser = async () => {

    try {
  
      const email = oauth.email
      const {data: users} = await axios.get(`http://localhost:3001/users/`)
  
      for (let i=0; i<users.length; i++) {
        if (users[i].username === email) {
          setUserImage(users[i].image);
        }
      }
  
    } catch (err) {
      alert ("Invalid User information")
    }
  
  }

  const CurrentImage = () => {

    getUser();

    if (userImage === 0) {
      return (
        <Gravatar
        email={oauth.email}
        size={30}
        style={{borderRadius: "50%"}}
        />
      )
    } else if (userImage === 1) {
      return (
        <Avatar alt="Star Wars" sx={{ width: "30px", height: "30px" }} src={StarWarsImage}/>
      )
    } else if (userImage === 2) {
      return (
        <Avatar alt="Ghetto" sx={{ width: "30px", height: "30px" }} src={GhettoImage}/>
      )
    } else if (userImage === 3) {
      return (
        <Avatar alt="Squeletton" sx={{ width: "30px", height: "30px" }} src={SquelettonImage}/>
      )
    } else if (userImage === 4) {
      return (
        <Avatar alt="Pikachu" sx={{ width: "30px", height: "30px" }} src={PikachuImage}/>
      )
    } else if (userImage === 5) {
      return (
        <Avatar alt="Lion" sx={{ width: "30px", height: "30px" }} src={LionImage}/>
      )
    }
    else {
      return (
        alert('No Prolife Image Found')
      )
    }
  }

  return (
    <header css={styles.header}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={drawerToggle}
        css={styles.menu}
      >
        <MenuIcon />
      </IconButton>
      {
        oauth ?
          <div>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={5}
            >
              <Grid item xs>
                <div>
                <Stack direction="row" spacing={50}>
                  <Typography><CurrentImage/>{oauth.email}</Typography>
                </Stack>
                </div>
              </Grid>
              <Grid item xs>
                <div>
                  <Typography><h1>Unit Chat</h1></Typography>
                </div>
              </Grid>
              <Grid item xs>
                <div>
                  <Button
                    size="small"
                    variant="outlined"
                    style={{backgroundColor: '#FFFFFF', color: '#2f435e'}}
                    onClick={onClickLogout}
                  >Logout</Button> 
                </div>
              </Grid>
            </Grid>
          </div>
        :
          <span><h1>Welcome to the Chat Application</h1></span>
      }
      
    </header>
  );
}
