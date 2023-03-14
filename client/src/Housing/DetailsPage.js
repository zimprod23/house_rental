import React, { useDebugValue, useEffect } from 'react';
import { Button, Drawer, Space,Typography } from 'antd';
import { useState } from 'react';
import QRCode from "react-qr-code";
import './HomePage.css';
import { Link } from 'react-router-dom';
const {Title} = Typography;

const DetailsPage = (props) => {
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
   setOpen(props.open);
   console.log(open)
  },[props])

  const onClose = () => {
    setOpen(false);
    props.updateToogle(false);
  };
  return (
    <>
      <Drawer
        title={props.data && props.data.ID}
        placement="right"
        size={"large"}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <div className='detailsContainer'>
            <div>
                <img src={props.data && props.data.img} />
            </div>
            <div>
            {props.data && props.data.RequiredClaims && props.data.RequiredClaims.map((e,i) => (
            <>
                <p>{e}</p>
            </>
            ))}
            </div>

        </div>
        <div className='QRContainer'>
            <p>
            Le Lorem Ipsum est simplement du faux texte employé dans la composition 
            et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard
            de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble
            des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas
            fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, 
            sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la 
            vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion
            dans des applications de mise en page de texte, comme Aldus PageMaker.
            </p>
        </div>
        <br />
      <Link to={`/:${props.data && props.data.ID}`}><Button type='primary' block>Apply now</Button></Link>
       
        {/* <Title level={2}>Scan to verify</Title>
        <br />

        <div className='QRContainer'>
            <QRCode value={props.data && props.data.ID} />
        </div> */}
      
      </Drawer>
    </>
  );
};
export default DetailsPage;