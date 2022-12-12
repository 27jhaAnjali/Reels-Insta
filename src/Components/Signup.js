import * as React from 'react';
import { useContext,useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import './Signup.css';
import instagram from '../Assets/Instagram.png'
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Link,useNavigate} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import { database,storage } from '../firebase';

export default function Signup () {
  const useStyles= makeStyles({
    text1:
    {
      color:'grey',
      textAlign:'center'
    },
    card2:
    {
      width:'32vw',
      height:'5vh',
      marginTop:'1%'
    }

    })
    const [showPassword,setShow] = useState(false)
    const classes = useStyles();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [file,setFile] = useState(null);
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false)
    const history = useNavigate();
    const {signup} = useContext(AuthContext);

    const handleClick = async() => {
        if(file===null){
            setError("Please upload profile image first");
            setTimeout(()=>{
                setError('')
            },2000)
            return;
        }
       try{
         setError('')
         setLoading(true)
         let userObj = await signup(email,password)
         let uid = userObj.user.uid
         console.log(uid);
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed',fn1,fn2,fn3);
            function fn1(snapshot){
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                console.log(`Upload is ${progress} done.`)
      }
            function fn2(error){
                setError(error);
                setTimeout(()=>{
                    setError('')
                },2000);
                setLoading(false)
                return;
            }
            function fn3(){
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log(url);
                    database.users.doc(uid).set({
                        email:email,
                        userId:uid,
                        fullname:name,
                        profileUrl:url,
                        createdAt:database.getTimestamp
                    })
                })
                setLoading(false);
                history('/')
            }
        }
    catch(err){
            setError(err);
            setTimeout(()=>{
                setError('')
            },2000)
        }
    }
      
  return (

    <div className='signupWrapper'>
<div className='signupCard'>
  
    <Card className='card' variant='outlined'>
      <div className='insta-logo'>
        <img className='logo-img' src={instagram} alt='Instagram'></img>
        </div>
        <CardContent>
          <Typography className={classes.text1} variant="subtitle2">
            Sign up to see photos and videos from your friends
          </Typography>

                    {error!=='' && <Alert severity="error">{error}</Alert>}

                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <TextField type={showPassword?"text":"password"} id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size="small"value={name} onChange={(e)=>setName(e.target.value)}/>
            <Button color='secondary' variant="outlined" fullWidth={true} margin='dense' startIcon={<CloudUploadIcon/>} component='label'>
              Upload Profile Image
              <input type="file" accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])}/>
            </Button>
        </CardContent>
          <CardActions>
          <Button color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleClick}> 
           Sign up
           </Button>
         </CardActions>
        <CardContent>
            <Typography className={classes.text1} variant="subtitle2">
               By signing up, you agree to our terms, condition and cookies policy.
            </Typography>
        </CardContent>
     </Card>
     <Card className={classes.card2} variant='outlined'>
        <CardContent>
          <Typography className={classes.text1} variant="subtitle2">
           Have and account?<Link to="/login" style={{textDecoration:"none"}}>Sign in</Link>
          </Typography>
        </CardContent>
     </Card>
    
    </div>
    </div>
    
    
  );
}