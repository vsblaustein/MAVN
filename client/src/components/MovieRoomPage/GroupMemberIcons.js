import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar } from '@mui/material';

// this document will generate the charts from the db and display them


export default function GroupMemberIcons(props) {


  return (
    <ImageList sx={{ width: '100%', height: '100%', padding: 0 }} cols={5} >
      {props.mem.map((item, idx) => (
        <ImageListItem key={idx} 
        sx={{ width: '100%', height: '100%', left:'5%', m: '10px', objectFit:'contain' }}>
          <img
            src={`${itemData[idx].img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${itemData[idx].img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={props.mem[idx]}
            loading="lazy"
            style={{width:'100%'}}            
          />

          <ImageListItemBar
            title={props.mem[idx]}
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
  {
    img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Rabbit-512.png',
    title: 'Abby',
  },
  {
    img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png',
    title: 'Nate',
  },
  {
    img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Panda-512.png',
    title: 'Valentina',
  },
];