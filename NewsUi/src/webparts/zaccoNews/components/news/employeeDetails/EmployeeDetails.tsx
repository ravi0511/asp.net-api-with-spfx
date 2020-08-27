import * as React from 'react';
import styles from './EmployeeDetails.module.scss';
import "react-datepicker/dist/react-datepicker.css";
import { IEmployeeDetailsProps } from './IEmployeeDetailsProps';
import { IEmployeeDetailsState } from './IEmployeeDetailsState';
import { escape } from '@microsoft/sp-lodash-subset';
import { withRouter } from 'react-router-dom' ;
import { Link } from 'react-router-dom';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, IButtonProps, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { HttpClientResponse, IHttpClientOptions, HttpClient } from '@microsoft/sp-http';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { createTheme, ITheme, ThemeSettingName } from 'office-ui-fabric-react/lib/Styling';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';

const theme: ITheme = createTheme({
    fonts: {
      medium: {
        fontFamily: 'Monaco, Menlo, Consolas',
        fontSize: '30px',
      },
    },
  });

  const stackTokens: IStackTokens = { childrenGap: 12 };

class EmployeeDetails extends React.Component<IEmployeeDetailsProps, IEmployeeDetailsState>{

    private fullname: string;
    private department: string;
    private experience: string;

    constructor(props){
        super(props);
        this.state = {
            fullName : '',
            department: '',
            experience: '',
            errorMessage: '',
            employeeData: []
        }

        this.addEmpData = this.addEmpData.bind(this);
    }

    componentWillMount(){
        this.getEmployeeData()
    }

    getEmployeeData(){
        const httpClientOptions: IHttpClientOptions = { 
            headers: { 
              'Accept': 'application/json'
            }
          };
          
          this.props.httpClient.get('http://localhost:5000/api/user/EmployeeDetails/', HttpClient.configurations.v1, httpClientOptions)
          .then((response: HttpClientResponse): Promise<any[]> => {
              return response.json();
          }).then((responseData: any[]): void => {
            console.log('employeeData:', responseData);
            this.setState((prevState:IEmployeeDetailsState, props: IEmployeeDetailsProps): IEmployeeDetailsState => {
              prevState.employeeData = responseData;
              return prevState;
            });
          }, (error: any): void => {
            console.log('error:', error);
          });
    }
    updateName(value: any): void{
        var data = value.target.value;
        this.setState({
            fullName: data
        });
    }
    updateDep(value: any): void{
        var data = value.target.value;
        this.setState({
            department: data
        });
    }
    updateExp(value: any): void{
        var data = value.target.value;
        this.setState({
            experience: data
        });
    }

    addEmpData(){
        if(this.state.fullName.length <= 0 || this.state.department.length <=0 || this.state.experience.length <= 0){
            this.setState({
                errorMessage: "Enter field value"
            });
        }
        else{
            let reactHadler = this;
            let newEmployee = {
                fullName: this.state.fullName,
                department: this.state.department,
                experience: this.state.experience
              };
              const httpClientOptions: IHttpClientOptions = { 
                headers: { 
                  'Accept': 'application/json',
                  'Content-type': 'application/json'
                },
                body: JSON.stringify(newEmployee)
              };
              this.props.httpClient.post('http://localhost:5000/api/user/EmployeeDetails', HttpClient.configurations.v1, httpClientOptions)
              .then((response: HttpClientResponse): void => {
                reactHadler.getEmployeeData();
                reactHadler.setState({
                        errorMessage: '',
                        fullName: '',
                        department: '',
                        experience: ''
                    });
              });
        }
    }

    render() : React.ReactElement<IEmployeeDetailsProps, any>{
        const empDetails = this.state.employeeData.map((item, index)=>{
            return(
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.fullName}</td>
                    <td>{item.department}</td>
                    <td>{item.experience}</td>
                </tr>
            )
        })
        return(
            <div>
                <Row>
                    <Col>
                        <Link to='/'>Home Page</Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Employee Details</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Employee Department</th>
                            <th>Employee Experience</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empDetails}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Stack tokens={stackTokens}>
                            <Separator theme={theme}>Add Employees</Separator>
                        </Stack>
                    </Col>
                </Row>
                <Row>
                    {/* <Col>
                        <div>Employee Name:</div>
                    </Col> */}
                    <Col className={'test'}>
                            <TextField required={true} value={this.state.fullName} onChange={this.updateName.bind(this)} errorMessage={this.state.fullName.length <= 0 ? this.state.errorMessage : ""} label='Employee Name'></TextField>
                    </Col>
                    <Col>
                            <TextField required={true} value={this.state.department}  onChange={this.updateDep.bind(this)} errorMessage={this.state.department.length <= 0 ? this.state.errorMessage : ""} label='Employee Department'></TextField>
                    </Col>
                    <Col>
                            <TextField required={true} value={this.state.experience}  onChange={this.updateExp.bind(this)} errorMessage={this.state.experience.length <= 0 ? this.state.errorMessage : ""} label='Employee Experience'></TextField>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <PrimaryButton  
                            primary={ true }
                            data-automation-id='test'
                            text='Add Employee'
                            // disabled={this.state.titleValue.length < 0 || this.state.preambleValue.length < 0}
                            onClick={ this.addEmpData.bind(this) }
                        />
                    </Col>
                </Row>
            </div>
        );
    }


}

export default withRouter(EmployeeDetails);