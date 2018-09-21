import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from './constants/server';
import { Button, Card, Row, Col, Input } from 'react-materialize';
import ExerciseInput from './ExerciseInput';


class FeedbackForm extends Component {
  constructor(props){
      super(props);
      this.state = {
          redirect: false,
          clients: [],
          numExercise: 1,
          exerciseData: [],
          prescriptionData: [],
          prescribeExercise: {
            exerciseId: '',
            repInfo: '',
            freqInfo: '',
          },
          providerId: '',
          clientId: '',

      };
  };

  componentDidMount() {
      console.log("On CDM of SignUp, user is:", this.props.user);
      console.log("This is the checkLogin value: ", this.props.checkedLogin)
      //this.retrieveExercises();
  }  


  validateAndAppend = () => {
    if(this.state.prescribeExercise.exerciseId &&
        this.state.prescribeExercise.repInfo &&
        this.state.prescribeExercise.freqInfo){
        // Data is valid! Append it.
        const newPrescriptionData = this.state.prescriptionData;
        newPrescriptionData.push(this.state.prescribeExercise);
        console.log('old prescription:', this.state.prescriptionData);
        console.log('new prescriotion:', newPrescriptionData);
        this.setState({
            errorMessage: '',
            prescribeExercise: {
                exerciseId: '',
                repInfo: '',
                freqInfo: ''
            },
            prescriptionData: newPrescriptionData,
            numExercise: this.state.numExercise + 1
        })
    }
    else {
        // At least one data field not entered
        this.setState({
            errorMessage: 'All fields required'
        })
    }
  }

//   handleNames = (e) => {
//       console.log('Getting those clients for provider', this.props.user)
//       if(this.props.user){
//         axios.get(SERVER_URL + '/users/clients/' + this.props.user.id)
//         .then( result => {
//             console.log(result.data.clients)
//                 this.setState({
//                     clients: result.data.clients,
//                     providerId: this.props.user.id
//                 })
//                 console.log(this.state.clients)
//         }).catch(err => {
//             console.log('THERE IS AN ERROR', err)
//         })
//       }
//   }

//   handleClientId = (e) => {
//       e.preventDefault();
//       console.log("The current client ID is: ", this.state.clientId)
//       this.setState({
//           clientId: e.target.value
//       })
//       console.log("The new client ID is: ", this.state.clientId)
//       console.log("This is the Provider ID: ", this.state.providerId)
//   }

  setRedirect = () => {
    this.setState({
        redirect: true
    })
  }

//   retrieveExercises = () => {
//     console.log('GETTING THOSE EXERCISES');
//     axios.get(SERVER_URL + '/exercises')
//     .then( result => {
//         console.log(result.data.exercises)
//         this.setState({
//             exerciseData: result.data.exercises
//         })
//         console.log('this is the new exercise state: ', this.state.exerciseData)
//     }).catch( err => {
//         console.log('Trouble getting exercises!')
//     })
//   }

  handleSubmit = (e) => {
      e.preventDefault();
      console.log('The exercise object is: ', this.state.prescriptionData);
      console.log('The state I am sending is: ', this.state);
    //   this.validateAndAppend()
    //   axios.post(SERVER_URL + '/prescriptions', this.state)
    //   .then(result => {
    //       this.setRedirect();
    //   }).catch(err => {
    //       console.log('The error from sending presciption is: ', err);
    //   })
  };
  
  render() {
    if (this.state.redirect === false) {
        if(this.props.checkedLogin && this.props.user) {
            return (
                <div className="container script-form-container z-depth-1 center">
                    <h2>Share Your Feedback</h2>
                    <p>{this.state.errorMessage}</p>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label className="flow-text">Did you have any pain today?</label>
                            <Row>
                              <Col s={4} className="offset-s5">
                                <Input className="left" name='group1' type='checkbox' value='Yes' label='Yes' />
                                <Input className="right" name='group1' type='checkbox' value='No' label='No' />
                              </Col>
                            </Row>
                        </div>
                        <div>
                            <label className="flow-text">If so, where was it?</label>
                            <Row>
                              <Col s={12}>
                                <Input type='text' placeholder="Please describe location of pain" />
                              </Col>
                            </Row>
                        </div>
                        <div>
                            <label className="flow-text">On a scale of 1 to 10, how would you rate your pain?</label>
                            <Row>
                                <Input s={12} name="name" type='range' min="0" max="10" onChange={this.handleClientId}></Input>
                            </Row>
                        </div>
                        <div>
                            <label className="flow-text">On a scale of 1 to 10, how hard was this workout?</label>
                            <Row>
                                <Input s={12} name="name" type='range' min="0" max="10" onChange={this.handleClientId}></Input>
                            </Row>
                        </div>
                        <div>
                            <label className="flow-text">Are there any other comments you would like to share with your physical therapist?</label>
                            <Row>
                                <Input s={12} name="name" type='textarea' min="0" max="10" onChange={this.handleClientId}></Input>
                            </Row>
                        </div>
                        <br></br>
                        <div>
                            <Button className="blue darken-1" type="submit" value="Register" waves='light' onClick={this.handleSubmit}>Submit</Button>
                        </div>
                    </form>
                </div>
            ) 
        } else if(this.props.checkedLogin) {
            return (
                <Redirect to="/" />
            )
        } else {
            return (
                <div>
                    <p>Loading ...</p>
                </div>
                
            )  
        }
      } else {
        return (
            <Redirect to="/profile" />
        )
    }
  }   
}

export default FeedbackForm;