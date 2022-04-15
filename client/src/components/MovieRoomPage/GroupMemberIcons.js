import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar } from '@mui/material';
import Axios from 'axios';
import { useEffect } from "react";


// this document will generate the charts from the db and display them

export default function GroupMemberIcons(props) {


  


  return (
    <ImageList sx={{ width: '100%', height: '100%', padding: 0 }} cols={5} rowHeight={270}>
      {props.mem.map((item, idx) => (
        <ImageListItem key={item} sx={{ width: '250px', height: '100%', left: 40, m: '10px', objectFit: 'cover' }}>
          <img
            src={`${itemData[idx].img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${itemData[idx].img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={props.mem[idx]}
            loading="lazy"
          />
          <ImageListItemBar
            title={props.mem[idx]}
            align='center'
            position="below"
            fontWeight='bold'
          />
        </ImageListItem>
      ))}
      {/* {itemData.map((item) => (
        <ImageListItem key={item.img} sx={{ width: '250px', height: '100%', left: 40, m: '10px', objectFit: 'cover' }}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            align='center'
            position="below"
            fontWeight='bold'
          />
        </ImageListItem>
      ))} */}
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