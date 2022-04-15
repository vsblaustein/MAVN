import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar } from '@mui/material';
import Axios from 'axios';
import { useEffect } from "react";


// this document will generate the charts from the db and display them

export default function GroupMemberIcons(props) {

  const [group_members, setGM] = React.useState([]);

  useEffect(() => {
    const members = [];

    // get the group members given the room code
    Axios.get('http://localhost:3001/getMembersList',
      {
        params: { room_code: props.code }
      }).then((response) => {

        // add members to the list
        for (const m in response.data) {
          members.push(response.data[m].username);
        }
        console.log("members for room " + props.code + ": " + members);
        setGM(members);

      }).catch(err => {
        console.log(err);

      });
  });


  return (
    <ImageList sx={{ width: '100%', height: '100%', padding: 0 }} cols={5} rowHeight={270}>
      {group_members.map((item) => (
        <ImageListItem key={item} sx={{ width: '250px', height: '100%', left: 40, m: '10px', objectFit: 'cover' }}>
          <img
            src={`${itemData[item].img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${itemData[item].img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={group_members[item]}
            loading="lazy"
          />
          <ImageListItemBar
            title={group_members[item]}
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