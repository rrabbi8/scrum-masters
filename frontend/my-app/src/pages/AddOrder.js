import React, { useEffect } from "react";
import Sidebar from "../components/sideBar/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { API, USER, ORDERS, CLIENTS } from "./urlConfig";
import { List, Input, Card, Button } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/reduxConfig";
import ClientCard from "../components/ClientCard";
import { CgProfile } from "react-icons/cg";
import AddOrderForm from "../components/AddOrderForm";

class AddOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientID: "Select Client from list",
      lineProducts: "",
      timePlaced: "",
      timeDue: "",
      totalFee: "",
      status: "",
      description: "",
      log: "",
      contacts: [],
    };
  }

  removeNull(array) {
    return array.filter((x) => x !== null);
  }

  componentDidMount = async () => {
    const endpoint = API + USER + "614180facb6259ce3427029f" + CLIENTS;
    const response = await axios.get(endpoint).catch((err) => {
      console.log("ERR", err);
    });
    console.log(response);
    this.setState({ contacts: this.removeNull(response.data) });
  };

  setClientID = (data) => {
    this.setState({ clientID: data });
  };

  render() {
    console.log(this.state.clientID);
    return (
      <div className="Master-div">
        <Sidebar />
        <div className="contacts">
          <Header
            page="Add Orders"
            addButton={false}
            actions={this.addOrder}
          ></Header>
          <div className="Add-order">
            <div className="add-top">
              <h2>List of Clients</h2>
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={this.state.contacts}
                renderItem={(item) => (
                  <ClientCard
                    addButton={true}
                    action={this.setClientID}
                    client={item._id}
                  ></ClientCard>
                )}
              />
              ,
            </div>
            <div className="add-mid">
              <h2>Add product</h2>
            </div>
            <div className="add-bottom">
              <h2>Input other detail</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AddOrders);
//   createHandler = (newItem) => {
//     const path = API + CLIENT;
//     const path2 = API + USER + this.props.user._id + CLIENTS;
//     console.log(newItem);
//     axios.post(path, newItem).then((res) => {
//       console.log(res);
//       this.setState({
//         id: res.data._id,
//         editDetails: false,
//         addContact: false,
//       });
//       axios
//         .post(path2, {
//           clientId: this.state.id,
//         })
//         .then((res) => {
//           axios.get(path2).then((res) => {
//             console.log(res);
//             this.setState({ contacts: res.data });
//           });
//         });
//     });
//   };

//   updateHandler = (newItem) => {
//     const path = API + CLIENT + newItem.id;
//     const path2 = API + USER + this.props.user._id + CLIENTS;
//     axios.patch(path, newItem).then((res) => {
//       console.log(res);
//       this.setState({
//         nameFirst: res.nameFirst,
//         nameLast: res.nameLast,
//         title: res.title,
//         company: res.company,
//         email: res.email,
//         phoneNumber: res.phoneNumber,
//         address: res.address,

//         showDetails: false,
//         editDetails: false,
//       });
//     });
//     axios.get(path2).then((res) => {
//       console.log(res);
//       this.setState({ contacts: res.data });
//     });
//   };

//   deleteHandler = () => {
//     const path = API + USER + this.props.user._id + CLIENTS;
//     if (window.confirm("Are you sure you want to delete")) {
//       console.log(this.state.id);
//       axios
//         .delete(path, {
//           data: { clientId: this.state.id },
//         })
//         .then((res) => {
//           console.log(res);
//           axios.get(path).then((res) => {
//             console.log(res);
//             this.setState({
//               contacts: res.data,
//               id: "",
//               nameFirst: "",
//               nameLast: "",
//               title: "",
//               company: "",
//               email: "",
//               phoneNumber: "",
//               address: "",
//               showDetails: false,
//             });
//           });
//         });
//     }
//   };

//   activateAdd = () => {
//     this.setState({ addContact: true });
//   };

//   deactivateAdd = () => {
//     this.setState({ addContact: false });
//   };

//   removeNull(array) {
//     return array.filter((x) => x !== null);
//   }

//   render() {
//     let details;
//     if (this.state.showDetails) {
//       if (!this.state.editDetails) {
//         details = (
//           <div className="contents-right">
//             <Card
//               className="contact-details"
//               style={{ width: 300, height: 320 }}
//               actions={[
//                 <Button onClick={() => this.setState({ editDetails: true })}>
//                   Edit
//                 </Button>,
//                 <Button onClick={this.deleteHandler}>Delete</Button>,
//               ]}
//             >
//               <h2>Contact Details</h2>
//               <div className="list-item-details">
//                 <h3>First Name: {this.state.nameFirst}</h3>
//                 <h3>Last Name: {this.state.nameLast}</h3>
//                 <h3>Title: {this.state.title}</h3>
//                 <h3>Company: {this.state.company}</h3>
//                 <h3>Email: {this.state.email}</h3>
//                 <h3>Phone: {this.state.phoneNumber}</h3>
//                 <h3>Address: {this.state.address}</h3>
//               </div>
//             </Card>
//           </div>
//         );
//       } else {
//         details = (
//           <div className="contents-right">
//             <Card
//               style={{ width: 300, height: 600 }}
//               actions={[
//                 <Button onClick={() => this.updateHandler(this.state)}>
//                   Update
//                 </Button>,
//               ]}
//             >
//               <h2>Contact Details</h2>
//               <div className="list-item-details">
//                 <Input
//                   placeholder={this.state.nameFirst}
//                   onChange={(e) => this.setState({ nameFirst: e.target.value })}
//                 />
//                 <Input
//                   placeholder={this.state.nameLast}
//                   onChange={(e) => this.setState({ nameLast: e.target.value })}
//                 />
//                 <Input
//                   placeholder={this.state.title}
//                   onChange={(e) => this.setState({ title: e.target.value })}
//                 />
//                 <Input
//                   placeholder={this.state.company}
//                   onChange={(e) => this.setState({ company: e.target.value })}
//                 />
//                 <Input
//                   placeholder={this.state.email}
//                   onChange={(e) => this.setState({ email: e.target.value })}
//                 />
//                 <Input
//                   placeholder={this.state.phoneNumber}
//                   onChange={(e) =>
//                     this.setState({ phoneNumber: e.target.value })
//                   }
//                 />
//                 <Input
//                   placeholder={this.state.address}
//                   onChange={(e) => this.setState({ address: e.target.value })}
//                 />
//               </div>
//             </Card>
//           </div>
//         );
//       }
//     }
//     return (
//       <div className="Master-div">
//         <Sidebar />
//         <div className="contacts">
//           <Header page="Contacts" actions={this.activateAdd}></Header>
//           <div className="contents">
//             <div className="contents-left">
//               <span>Name</span>
//               <List
//                 itemLayout="horizontal"
//                 dataSource={this.removeNull(this.state.contacts)}
//                 renderItem={(item) => (
//                   <List.Item
//                     className="contact-item"
//                     key={item.id}
//                     actions={[
//                       <Button
//                         type="dashed"
//                         block
//                         onClick={() =>
//                           this.setState({
//                             id: item._id,
//                             nameFirst: item.nameFirst,
//                             nameLast: item.nameLast,
//                             title: item.title,
//                             company: item.company,
//                             email: item.email,
//                             phoneNumber: item.phoneNumber,
//                             address: item.address,
//                             showDetails: true,
//                           })
//                         }
//                       >
//                         Details
//                       </Button>,
//                     ]}
//                   >
//                     <List.Item.Meta
//                       title={`${item.nameFirst} ${item.nameLast}`}
//                       description={item.email}
//                       avatar={<CgProfile />}
//                     />
//                   </List.Item>
//                 )}
//               />
//             </div>
//             {details}
//           </div>
//           <AddContactForm
//             trigger={this.state.addContact}
//             actions={this.deactivateAdd}
//             createAction={this.createHandler}
//           ></AddContactForm>
//         </div>
//       </div>
//     );
//   }
// }

// export default connect(mapStateToProps)(Orders);