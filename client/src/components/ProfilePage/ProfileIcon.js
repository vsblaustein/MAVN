import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar } from '@mui/material';


export default function ProfileIcon() {
    return (
      
      <ImageList sx={{ width: '100%', height:'100%', padding:0}} cols={5} rowHeight={300}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} sx={{width:'250px', height:'100%', m:'10px',objectFit:'cover'}}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar sx={{marginLeft: '180px'}}
              title={item.title}
              align='center'
              position="below"
              fontWeight='bold'
            />
          </ImageListItem>
        ))}
      </ImageList>

    );
  }
  
  const itemData = [
    {
      img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png',
      title: 'Mehdi',
    },
    
  ];