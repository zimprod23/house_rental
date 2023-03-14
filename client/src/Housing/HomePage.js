import React, { useEffect, useState } from 'react';
import { Card,Button,Space,Drawer } from 'antd';
import './HomePage.css'
import {useSelector} from 'react-redux'
import DetailsPage from './DetailsPage';
const { Meta } = Card;




function HomePage(props) {

    const [open,setOpen] = useState(false)
    var toogle = false;
    // var cpp = 1


    const updateToogle = (t) => {
        setOpen(t);
    }
    function toogleDrawer(){
         toogle =! toogle;
          setOpen(toogle);
    }
    // const onClose = () => {
    //     setOpen(false);
    //   };

    // function DrawerFragment(props){
    //     return (
    //         <>
    //           <Drawer
    //             title={"props.ID"}
    //             placement="right"
    //             size={"large"}
    //             onClose={onClose}
    //             open={open}
    //             extra={
    //               <Space>
    //                 <Button onClick={onClose}>Cancel</Button>
    //                 <Button type="primary" onClick={onClose}>
    //                   OK
    //                 </Button>
    //               </Space>
    //             }
    //           >
    //             {/* <div className='detailsContainer'>
    //                 <div>
    //                     <img src={props.data.img} />
    //                 </div>
    //                 <div>
    //                 {props.data.RequiredClaims.map((e,i) => (
    //                 <>
    //                     <p>{e}</p>
    //                 </>
    //                 ))}
    //                 </div>
        
    //             </div> */}
              
    //           </Drawer>
    //         </>
    //       );
    // }


    const [houses,setHouses] = useState(useSelector((state) => state.houses.data))
    
    const [current_house,setCurrent_house] = useState(houses[0])
    function setDrawerData_toogle(i){
        toogleDrawer();
        setCurrent_house(houses[i])
    }


    return (
       <div className='MainContainer'>
          {houses.map((e,i) => (
            <div className='CardContainer'>
               <Card
                 hoverable
                 cover={<img src={e.img}/>}
                 onClick={() => setDrawerData_toogle(i)}
               >
              <Meta title={e.ID} description={e.Price + "$"}/>          
               </Card>
            </div>
          ))}
           <DetailsPage open={open} data={current_house} Toogle={updateToogle}/>
       </div>
    );
}

export default HomePage;