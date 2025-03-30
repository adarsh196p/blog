//Create the Home UI for the BlogAPP(Cards are preferrred; You may choose your UI preference )


//Write your code here
import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Typography, CardMedia,Grid, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    axios
      .get("http://localhost:3001/get")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBlog = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then((res) => {
        alert(res.data.message);
        fetchBlogs();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateBlog = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }
            }}>
              {/* Blog Image */}
              {blog.img_url && (
                <CardMedia
                  component="img"
                  height="200"
                  image={blog.img_url}
                  alt={blog.title}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Blog Title */}
                <Typography variant="body2" gutterBottom sx={{ fontWeight: '' }}>
                  {blog.title}
                </Typography>
                
                {/* Blog Content (limited to 3 lines) */}
                <Typography 
                  variant="h6" 
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 2,
                    fontWeight: 'bold'
                  }}
                >
                  {blog.content}
                </Typography>
              </CardContent>
              
              {/* Action Buttons */}
              <Box sx={{ 
  display: 'flex', 
  justifyContent: 'flex-start',  // Align to the start
  gap: 2,  // Add space between buttons
  p: 2,
  pt: 0
}}>
  <Button 
    variant="contained" 
    size="small"
    onClick={() => deleteBlog(blog._id)}
    sx={{
      bgcolor: '#9c27b0',  // Purple color to match header
      '&:hover': {
        bgcolor: '#7b1fa2',  // Slightly darker on hover
      }
    }}
  >
    DELETE
  </Button>
  <Button 
    variant="contained" 
    size="small"
    onClick={() => updateBlog(blog._id)}
    sx={{
      bgcolor: '#9c27b0',  // Purple color to match header
      '&:hover': {
        bgcolor: '#7b1fa2',  // Slightly darker on hover
      }
    }}
  >
    UPDATE
  </Button>
</Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;