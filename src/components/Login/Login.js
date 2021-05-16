import React from 'react';

import ls from 'local-storage';
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setAlert } from '../../redux/actions/appActions';

const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;

const Login = (props) => {
    const { setAlert } = props;

    const history = useHistory();

    const handleSuccess = (res) => {
        ls.set('user', res.profileObj);
        history.push('/');
    };

    const handleFailure = (res) => {
        setAlert('Popup closed by user!');
    };

    return (
        <div className="login">
            <div className="login-content">
                <h1 className="title">Login To Notes Keeper</h1>
                <GoogleLogin
                    clientId={clientId}
                    render={(renderProps) => (
                        <button
                            type="button"
                            className={`login-button ${
                                renderProps.disabled ? 'lb-disabled' : ''
                            }`}
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            <FcGoogle />
                            Login with Google
                        </button>
                    )}
                    onSuccess={handleSuccess}
                    onFailure={handleFailure}
                    cookiePolicy="single_host_origin"
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: (msg) => dispatch(setAlert(msg)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
