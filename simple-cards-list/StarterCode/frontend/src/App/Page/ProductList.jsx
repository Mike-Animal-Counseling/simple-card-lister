import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, CardMedia, Typography,
  IconButton, Grid, Container
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {

  const [products, setProducts] = useState([]);

  //implement the get products function
  const fetchProducts = async() => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("Error when fetch products:", error);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  //implement the delete function
  const handleDelete = async(id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter(product => product.id !== id));
      } else {
        console.error("Failed to delete the product");
      }
    } catch (error) {
      console.error("Error when deleting products:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" margin={4}>
      Simple Card List
    </Typography>
      <Grid container justifyContent="center" spacing={2}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card sx={{ width: 300 }}>
              <IconButton onClick={() => handleDelete(product.id)} aria-label="delete" color='error'>
                  <DeleteIcon />
                </IconButton>
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1">${product.price}</Typography>
                <Typography variant="subtitle1">{product.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;