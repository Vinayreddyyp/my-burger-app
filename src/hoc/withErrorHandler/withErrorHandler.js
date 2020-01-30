import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';


const withErrorHandler = (WrappedComponent, axios) => {

        return class extends Component {
            state = {
                error: null,
            };
            
        
            componentWillMount() {
               this.reqInterceptor =  axios.interceptors.request.use(req => {
                    console.log("request error 1", this.state.error);
                    this.setState({error: null})
                    console.log("request error 2", this.state.error);
                    console.log("req", req);
                    return req;
                });
        
                this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                    console.log("after response error 1", this.state.error);
                    this.setState({error: error});
                    console.log("after response error 2", this.state.error);
                    console.log("error", error);
                });
            }

            componentWillUnmount()  {
                console.log("will unMount", this.reqInterceptor, this.resInterceptor)
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor)
            }
            errorConfirmedHandler = () => {
                this.setState({ error: null})
            }

            render() {
                return (
                    <Aux>
                        <Modal 
                        show={this.state.error}
                        modlaClosed={this.errorConfirmedHandler}>
                         {this.state.error ? this.state.error.message : null}
                        </Modal>
                        <WrappedComponent {...this.props} />
                    </Aux>
                )
            }
        }
}

export default withErrorHandler;