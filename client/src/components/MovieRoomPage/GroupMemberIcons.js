import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar } from '@mui/material';
import Axios from 'axios';
// this document will generate the charts from the db and display them


export default function GroupMemberIcons(props) {

  var memProfiles = React.useRef([]);


  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const response = await MyAPI.getData(someId);
  //     // ...
  //   }
  //   fetchData();
  // }, [someId]); // Or [] if effect doesn't need props or state

  React.useEffect(() => {
    var images = [];
    console.log("members: " + props.mem);
    async function fetchImages() {
    for (const m in props.mem) {
      // store the user in local storage
      const response = await Axios.get('http://localhost:3001/getProfile', {
        params: { name: props.mem[m] }
      });

        console.log(response.data[0].image_path);
        images.push(response.data[0].image_path);
      }
    }
    fetchImages();
    // memProfiles = images;
    memProfiles.current = images;
    console.log("member profile images:" + memProfiles.current);
  });

  // fetchProfileImages = async() => {
  //   //console.log("fetching members of group");
  //   try {
  //     const resp = await Axios.get('http://localhost:3001/getMembersList', {
  //       params: { room_code: this.state.roomCode }
  //     });
  //     //console.log("member list", resp.data);
  //     return resp.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }


  // React.useEffect(() => {
  //   var images = [];
  //   async function fetchProfileImages() {
  //     console.log("members: " + props.mem);
  //     for (const m in props.mem) {
  //       // store the user in local storage
  //       await Axios.get('http://localhost:3001/getProfile', {
  //         params: { name: props.mem[m] }
  //       }).then((response) => {
  //         console.log(response.data[0].image_path);
  //         images.push(response.data[0].image_path);
  //       }).catch(err => {
  //         console.log(err);
  //       });
  //     }
  //   } 
  //   fetchProfileImages();

  //   // setMemProfiles(images);
  //   console.log("member profile images:" + memProfiles);

  // }, [props.mem, memProfiles]);


  return (
    <ImageList sx={{ width: '100%', height: '100%', padding: 0 }} cols={5} >
      {memProfiles.current.map((item, idx) => (
        <ImageListItem key={idx}
          sx={{ width: '100%', height: '100%', left: '5%', m: '10px', objectFit: 'contain' }}>
          <img
            src={memProfiles.current[idx]}
            srcSet={memProfiles.current[idx]}
            alt={props.mem[idx]}
            loading="lazy"
            style={{ width: '100%' }}
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
  },
  {
    img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Rabbit-512.png',
  },
  {
    img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png',
  },
  {
    img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Panda-512.png',
  },
  {
    img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-512.png',
  },
  {
    img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Pig-512.png',
  },
  {
    img: 'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Frog-512.png'
  }
];