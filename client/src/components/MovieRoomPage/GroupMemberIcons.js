import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar } from '@mui/material';
import Axios from 'axios';
// this document will generate the charts from the db and display them


export default function GroupMemberIcons(props) {

  const memProfiles = props.images;

  return (
    <ImageList sx={{ width: '100%', height: '100%', padding: 0 }} cols={5}>
      {memProfiles.map((item, idx) => (
        <ImageListItem key={idx} y
          sx={{ maxHeight: { xs: '50vh', md: '50vh' },
          maxWidth: { xs: '35vh', md: '35vh' }, width: '100%', height: '100%', 
          left: '5%', m: '10px', objectFit: 'contain' }}>
          <img
            src={item}
            srcSet={item}
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
