import React, { useEffect, useState } from 'react';
import './HomePage.css'
import {Col,Row,Form,Input,Modal,Button,Select,Result, Spin,QRCode} from 'antd';
import {InfoCircleOutlined,CheckCircleFilled,InfoCircleFilled} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {getSpHouses} from '../redux/housesReducer' 


const {Option} = Select

function ApplicationPage(props) {


    const [openModal,setOpenModal] = useState(false)
    const [verified,setVerified] = useState(false);
    const [renderSpin,setrenderSpin] = useState(false);
    const [qrModal,setQrModal] = useState(false)
    const [verifiedClaim,setVerifiedClaim] = useState([false,false,false]) //supposing we have only 3 claims to verify 
    const [userData,setUserData] = useState({
            fname : "",
            lname : "",
            addr  : "",
            email : "",
            phone : "",
            country : ""
    })

    const spHouse =  useSelector((state) => state.houses.data);
    const user = useSelector((state) => state.user.user);
    const [targetHouse,setTargetHouse] = useState({})
    var url = window.location.pathname;
   
   
    useEffect(() => {
       const id = url.split(":")[1]
       setTargetHouse(spHouse.filter((e,i) => e.ID == id)[0]);
    },[spHouse])

    const onFinish = (values) => {
        console.log('Success:', values);
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }}
          >
            <Option value={`${userData.phone && userData.phone.split(" ")[0]}}`}>{userData.phone && userData.phone.split(" ")[0]}</Option>
          </Select>
        </Form.Item>
      );


      const Communicate = () => {
        const claimdata = {} 
        var receivedData = {}
        targetHouse.RequiredClaims && targetHouse.RequiredClaims.map((e,i) => {

             Object.assign(claimdata,{["claim"+i] : e})
  
        })
       
        console.log(claimdata)
        const ws = new WebSocket("ws://localhost:8080");
        //First we send claims to verify
       ws.onopen = () => {
         console.log("WebSocket connection established");
         ws.send(JSON.stringify(claimdata))
       };
     

       //here we receive either the claims are verified and also the userdata
       ws.onmessage = (event) => {
         console.log(`Received from client message: ${event.data}`);
         receivedData = JSON.parse(event.data)
         setUserData(receivedData['user'])
         //We set verified claims as an array where each index indicate the status of a claims
         setVerifiedClaim(receivedData['claims'])
        console.log(verifiedClaim)
       };
       if(qrModal == true) ws.close()

       setrenderSpin(false)
       setQrModal(false)
      }
      

      const Verify = () => {
        setQrModal(true)
        
        setrenderSpin(true);
        setTimeout(() => {
            Communicate()
        }, 3500);
      }


    const CloseQrCommunication = () => {
      setQrModal(false)
      
    }

    const ApplicationForm = () => (
                <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="First Name"
            name="fname"
            >
            <Input defaultValue={userData.fname}/>
            </Form.Item>

            <Form.Item
            label="Last Name"
            name="lname"
            >
            <Input defaultValue={userData.lname}/>
            </Form.Item>

            <Form.Item
            label="Address"
            name="addr"
            >
            <Input defaultValue={userData.addr}/>
            </Form.Item>

            <Form.Item
            label="Country"
            name="country"
            >
            <Input defaultValue={userData.country}/>
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} defaultValue={userData.phone && userData.phone.split(" ")[1]}/>
            </Form.Item>

            <Form.Item
            label="Email"
            name="email"
            >
            <Input defaultValue={userData.email}/>
            </Form.Item>

            <div id='req-claims-container'>
                {targetHouse.RequiredClaims && targetHouse.RequiredClaims.map((e,i) =>(
                       <p>{e}  &nbsp;&nbsp;&nbsp;{verifiedClaim[0] == false? <InfoCircleOutlined size={"large"} style={{fontSize:'20px'}}/> : <CheckCircleFilled size='large' style={{color : '#52c41a',fontSize:'20px'}} /> }</p>
                    
                ))}
            </div>
            <Row>
              <Col span={8}>
                 
              </Col>
              <Col span={16}>
             
              </Col>
            </Row>      
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary"  block onClick={Verify}>
                Fill & Verify
            </Button>
            <br />
            <br />
           {verified && <Button   block onClick={() => setOpenModal(true)} style={{backgroundColor : "#26de81"}} >
                Sign & Apply
            </Button>}
            </Form.Item>
        </Form>
        );
            

        //Feedback

        const ApplicationResult = () => (
            <>
              <Modal
                title="Application"
                centered
                open={openModal}
                onOk={CloseQrCommunication}
                onCancel={CloseQrCommunication}
                width={1000}
              >
                <div>
                <Result
                    status="success"
                    title="Successfully Approved"
                    subTitle="Order number: 2017182818828182881 click Ok to continue to payement"
                />
                </div>
              </Modal>
            </>
          );

          const QrCodeHolder = () => (
            <>
              <Modal
                title="QR"
                centered
                open={qrModal}
                onOk={() => setQrModal(false)}
                onCancel={() => setQrModal(false)}
                width={500}
              >
                 <div style={{
                display : 'flex',
                flexDirection : 'row',
                justifyContent : 'center',
                margin : '15px',
                padding : '8px'

              }}>
                 <QRCode value={targetHouse.ID} />
            </div>
              </Modal>
            </>
          );





    return (
        <div className='AppPage-global-Container'>
            {/* Rendering the spin */}
            {renderSpin && <div className='spin-holder'> <div><Spin size='large'/></div></div>}
            <div>
                <p>{targetHouse.ID}</p>
            </div>
            
           {targetHouse !== {}? <Row>
                <Col span={12}>
                {/* Here Goes the picture */}
                   
                 <img src={targetHouse.img} alt='server-err' width={'100%'}/>

                </Col>


                <Col span={12}>
                {/* Here goes the form */}
                <ApplicationForm />
                <ApplicationResult />
                <QrCodeHolder />
                </Col>
            </Row>:
            <Spin size='large' />
            }
        </div>
    );
}

export default ApplicationPage;