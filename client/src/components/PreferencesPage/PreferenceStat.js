import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar } from '@mui/material';

// this document will generate the charts from the db and display them

export default function PreferencesStats() {
  return (
    <ImageList sx={{ width: '100%', height:'100%', padding:0}} cols={5} rowHeight={270}>
      {itemData.map((item) => (
        <ImageListItem key={item.img} sx={{width:'150px', height:'100%', left:40, m:'10px',objectFit:'cover'}}>
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
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://www.tableau.com/sites/default/files/2021-06/DataGlossary_Icons_Pie%20Chart.jpg',
    title: 'Genre',
  },
  {
    img: 'https://www.tableau.com/sites/default/files/2021-06/DataGlossary_Icons_Pie%20Chart.jpg',
    title: 'Length',
  },
  {
    img: 'https://www.tableau.com/sites/default/files/2021-06/DataGlossary_Icons_Pie%20Chart.jpg',
    title: 'Release Year',
  },
  {
    img: 'https://www.tableau.com/sites/default/files/2021-06/DataGlossary_Icons_Pie%20Chart.jpg',
    title: 'Actors',
  },
  {
    img: 'https://www.tableau.com/sites/default/files/2021-06/DataGlossary_Icons_Pie%20Chart.jpg',
    title: 'Rating',
  },
];
