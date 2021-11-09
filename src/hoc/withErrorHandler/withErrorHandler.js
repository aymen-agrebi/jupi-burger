import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary';
import useHttpErrorHahndler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, clearError] = useHttpErrorHahndler(axios);
        return (
            <Auxiliary>
                <Modal show={error}
                modalClosed={clearError} >
                {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Auxiliary>
        );
    }
}

export default withErrorHandler;