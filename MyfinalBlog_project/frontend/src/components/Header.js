import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";



import {
    AppBar, Box, Button, Toolbar, Typography,Tabs,Tab
  } from "@mui/material";
  import { Link } from "react-router-dom";
 
const Header = () => {

  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  const [value,setValue] = useState();
  return (
   <AppBar  position="sticky" sx={{background:'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)'}}> 
     
    <Toolbar>

        <Typography  variant='h4' > 
       <b>  BlogReach </b>
         
        </Typography>

        <Typography variant='h5' style={{marginLeft:'20px',color:'orangered',fontSize:'bolder',fontFamily:"cursive"}}> 
       <b >   Reach New Heights With BlogReach </b>
         
        </Typography>

       { isLoggedIn && <Box display="flex" marginLeft='auto' marginRight='auto'>
             <Tabs  value={value} onChange={(e,val)=>setValue(val)} >
              <Tab LinkComponent={ Link } to="/blogs" label="All Blogs" />             
              <Tab  LinkComponent={ Link } to="/myBlogs" label="My Blogs" />    
              <Tab
                LinkComponent={Link} to="/blogs/add" label="Add Blog"/> 

              </Tabs>

        </Box>}

        <Box  display='flex' marginLeft='auto' > 
             
             
           { !isLoggedIn && <> <Button  LinkComponent={ Link } to="/auth" variant='contained' sx={{margin:1,color:'white' , borderRadius:15}} > Login</Button> 
             <Button   LinkComponent={ Link } to="/auth" variant='contained' sx={{margin:1,color:'white' , borderRadius:15}} > Signup</Button> </>  }
          {  isLoggedIn &&  <Button    onClick={() => dispath(authActions.logout())}  LinkComponent={ Link } to="/auth" variant='contained' sx={{margin:1,color:'white' , borderRadius:15}} > Logout</Button> }
        </Box>
    </Toolbar>

   </AppBar>
  )
}

export default Header