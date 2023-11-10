'use client'

import { useState, useEffect, use } from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteForever from '@mui/icons-material/DeleteForever';
import AddBox from '@mui/icons-material/AddBox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, Grid, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Icon } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FaceRetouchingNatural } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ToDos() {

    const [isLoading, setIsLoading] = useState(true);
    const [galleries, setGalleries] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        fetch("/api/profile/galleryhome", { method: "get" })
          .then((response) => response.ok && response.json())
          .then((petphoto) => {
            setGalleries(petphoto);
            setIsLoading(false);
          });
      }, [])

    const loadingItems = <CircularProgress/>;
    
    const toDoItems = isLoading ? loadingItems : galleries[0].map((photo, idx) => {
        return <Grid item xs = {2.4} >  
            <Button sx ={{border: '5px solid #000' ,width: 300, height: 300 }} component = {Link} href='/demo_profile'>
                <Image src = {photo.imageUrl} alt = "photos" width = {290} height = {290}/>
            </Button>
        
        </Grid>
    })

    const cityGallery = isLoading ? loadingItems : galleries[0].map((val) => {
        if(true === true)
        {
            return val;
        }
    })

    function splitArr(array)
    {
        const resu = [];
        if (array.length === 0)
        {
            return [[1]];
        }
        else
        {
        for (let i = 0; i< array.length; i+=5)
        {
            resu.push(array.slice(i,i+5));
        }
       
        return resu;
    }
    }

    const splitArray = splitArr(cityGallery);

    let arry = ["PE","TP","LA","CE","!!"];
    let arry2 = [6,7,8,9,10];
    let arry3 = [arry, arry2, arry];
    const [arryInd, setArryInd] = useState(0);

    const slider = isLoading ? loadingItems : splitArray[arryInd].map((val, idx) => {
      return <Grid item xs = {2.4}>
        <Button sx ={{border: '5px solid #000' ,width: 300, height: 300 }} component = {Link} href='/demo_profile'>
                <Image src = {val.imageUrl} alt = "photos" width = {290} height = {290}/>
            </Button>
      </Grid>
    })

    function sliderInc (){
      if (arryInd >= 0 && arryInd < splitArray.length - 1 )
      {
        setArryInd(arryInd + 1);
      }
    }

    function sliderDec (){
      if (arryInd > 0 && arryInd <= splitArray.length - 1)
      {
        setArryInd(arryInd - 1)
      }
    }

    function getProfile(){

    }



    return (
        <>
         {/* <li> link: <a href="/demo_profile"> demo profile page</a>   </li> */}
            <h2><center>Explore</center></h2>
            <center><Box sx = {{flexgrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Grid container justifyContent = "center" alignItems = "center" rowSpacing = {1} >
                {slider}
                {!isLoading && <ListItem key="leftArrow" secondaryAction={<IconButton sx={{mr: 213, mb: 45}} onClick={sliderDec}><ArrowBackIosIcon sx={{color: 'black'}} /></IconButton>}></ListItem> }
                {!isLoading && <ListItem key="rightrrow" secondaryAction={<IconButton sx={{mr: -3.3, mb: 45}} onClick={sliderInc}><ArrowForwardIosIcon sx={{color: 'black'}} /></IconButton>}>
                  </ListItem>}  
              </Grid>
            </Box></center>

            
            <center><Box sx = {{ flexgrow: 1}}>
              <Grid container rowSpacing = {1} >
                {toDoItems}
              </Grid>
            </Box></center>
        </>
    );
}
