import React from 'react'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };

  console.log(title,isUser);
  return (
    <div> 
      <Card sx={{        width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },}}>

     {isUser && (
      <Box display='flex' >
    
    <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              < EditIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
      </Box>
     )}       

    <CardHeader  sx={{textTransform:'uppercase' }}
      avatar={
        <Avatar sx={{ color:'white',fontWeight:'bolder',background:'blue' }} aria-label="recipe">
          {userName.charAt(0)}
        </Avatar>
      }
      
      title={title }
      
    />
    <CardMedia
      component="img"
      height="320"
      sx={{borderRadius:'3%'}}
      image={imageURL}
      alt="Paella dish"
    />
 
    <CardContent>
    <hr></hr>
    <br></br>
      <Typography variant="body2" color="text.secondary">
      <b style={{color:'red',textTransform:'capitalize',fontSize:'25px'}} >{userName}</b>  {": "} {description} 
      </Typography>
    </CardContent>


  </Card>
  </div>
  )
}

export default Blog