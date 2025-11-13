import { Splitter, SplitterPanel } from 'primereact/splitter';
import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import { PhotoService } from '../../service/PhotoService.js';
import HomeMenu from './HomeMenu.jsx';


const Home = () => {
    const [images, setImages] = useState(null);

    useEffect(() => {
            PhotoService.getImages().then(data => setImages(data));
    }, []);

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%',maxHeight:"70vh",display: 'block'}} />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
    }

  return (
    <>
    <div style={{height:"5vh"}}></div>
    <Splitter style={{ height: '70vh' }}>
            
            <SplitterPanel className="flex flex-column align-items-center justify-content-center" style={{height:"100%"}}>
                    <Galleria value={images} numVisible={5} circular style={{ width: '100%', height: '100%' }}
                        showThumbnails={false} showItemNavigators item={itemTemplate} thumbnail={thumbnailTemplate} />
            </SplitterPanel>
            <SplitterPanel className="flex flex-column align-items-center justify-content-center" style={{backgroundColor:"#B7C4CA"}}>
                <span>שוקולדים וממתקים</span>
                <span>נעשים עם תשוקה בפריז</span>
                <span>טבעוני ומופחת סוכר</span>
            </SplitterPanel>

    </Splitter>
    <HomeMenu ></HomeMenu>
    </>
  )
}

export default Home