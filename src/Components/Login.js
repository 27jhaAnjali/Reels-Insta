import * as React from 'react';
import { useContext,useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import './Login.css';
import instagram from '../Assets/Instagram.png'
import insta from '../Assets/insta.png'
import TextField from '@mui/material/TextField';
import { CarouselProvider, Slider, Slide, /*ButtonBack, ButtonNext,*/Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {Link, useNavigate } from 'react-router-dom';
// import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import img1 from '../Assets/img1.jpg'
import img2 from '../Assets/img2.jpg'
import img3 from '../Assets/img3.jpg'
import img4 from '../Assets/img4.jpg'
import img5 from '../Assets/img5.jpg'

export default function Login () {
  const store= useContext(AuthContext)
  console.log(store);
  const useStyles= makeStyles({
    text1:
    {
      color:'grey',
      textAlign:'center'
    },
    card2:
    {
      width:'27vw',
      height:'5vh',
      marginTop:'1%'
    },
    text2:{
        textAlign:'center'
    }

    })
    const classes = useStyles();
    const [showPassword] = useState(false)
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const history = useNavigate();
    const {login} = useContext(AuthContext);

    const handleClick = async() => {
        try{
            setError('');
            setLoading(true)
            let res = await login(email,password);
            setLoading(false);
            history('/')
        }catch(err){
            setError(err);
            setTimeout(()=>{
                setError('')
            },2000);
            setLoading(false);
        }
    }
    // const forgotPassword=()=>{
    // const auth = getAuth();
    // sendPasswordResetEmail(auth, email)
    //   .then(() => {
    //     // Password reset email sent!
    //     // ..
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ..
    //   });
    //}

  return (

    <div className='loginWrapper'>
           <div className="imgcar" style={{backgroundImage:'url('+insta+')',backgroundSize:'cover'}}>
              <div className="car">
              <CarouselProvider
                 visibleSlides={1}
                 totalSlides={5}
                 // step={3}
                 naturalSlideWidth={238}
                 naturalSlideHeight={423}
                 hasMasterSpinner
                 isPlaying={true}
                 infinite={true}
                 dragEnabled={false}
                 touchEnabled={false}>
               <Slider>
                    <Slide index={0}><Image src={img1}/></Slide>
                    <Slide index={1}><Image src={img2}/></Slide>
                    <Slide index={2}><Image src={img3}/></Slide>
                    <Slide index={3}><Image src={img4}/></Slide>
                    <Slide index={4}><Image src={img5}/></Slide>
               </Slider>
              </CarouselProvider>
                </div>
              </div>
  <div className='loginCard'>
  
    <Card className='card' variant='outlined'>
      <div className='insta-logo'>
        <img className='logo-img' src={instagram} alt='Instagram'></img>
        </div>
        <CardContent>
          {/* <Typography className={classes.text1} variant="subtitle2">
            Sign up to see photos and videos from your friends
          </Typography> */}
              
            {error!='' && <Alert severity="error">{error}</Alert>}
             <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
             <TextField type={showPassword?"text":"password"}id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>setPassword(e.target.value)}/>
             <Typography className={classes.text2} color="primary" variant="subtitle1" /*onClick={forgotPassword}*/>
                        Forgot Password ?
                    </Typography>
        </CardContent>
          <CardActions>
          <Button color="primary" fullWidth={true} variant="contained" onClick={handleClick} disabled={loading}>
             Log in
           </Button>
         </CardActions>
     </Card>
     <Card className={classes.card2} variant='outlined'>
        <CardContent>
          <Typography className={classes.text1} variant="subtitle2">
           Don't have and account?<Link to="/Signup" style={{textDecoration:"none"}}>Sign up</Link>
          </Typography>
        </CardContent>
     </Card>
    
    </div>
    </div>
    
    
  );
}