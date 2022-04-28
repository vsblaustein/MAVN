import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar } from '@mui/material';
import { useNavigate } from 'react-router-dom';



// get the member icons from the database
export default function GroupMemberIcons(props) {

  const memProfiles = props.images;
  let navigate = useNavigate();


  // navigate to their user page
  const handleClick = (name) =>{
    console.log(name);
    navigate('/profile/' + name.toLowerCase(), { replace: true });
  }

  return (
    <ImageList sx={{ width: '100%', height: '100%', padding: 0 }} cols={5}>
      {memProfiles.map((item, idx) => (
        <ImageListItem key={idx}
          sx={{ maxHeight: { xs: '50vh', md: '50vh' },
          maxWidth: { xs: '35vh', md: '35vh' }, width: '100%', height: '100%', 
          left: '5%', m: '10px', objectFit: 'contain' }}>
          <img
            src={item}
            srcSet={item}
            alt={props.mem[idx]}
            loading="lazy"
            style={{ width: '100%' }}
            onClick={() => handleClick(props.mem[idx])}
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
