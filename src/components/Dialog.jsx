import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';

function Dialog(props) {
    return (
        <Modal
            size={props.size}
            open={props.open}
            onClose={props.onClose}
        >
            <Header
                icon={
                    props.type === 'decision' ? 'question circle' : 'info circle'
                }
                content={props.title}   
            />
            <Modal.Content>
                <p>{props.content}</p>
            </Modal.Content>
            <Modal.Actions>
                {
                    props.type === 'decision' ? (
                        <Fragment>
                            <Button
                                negative
                                onClick={props.onClickNo}
                            >
                                No
                            </Button>
                            <Button
                                positive
                                content='Yes'
                                icon='checkmark'
                                labelPosition='right'
                                onClick={props.onClickYes}
                            >
                            </Button>
                        </Fragment>
                    ) : (
                        <Button 
                            positive
                            onClick={props.onClickOk}
                        >
                            Ok
                        </Button>
                    )
                }
            </Modal.Actions>
        </Modal>
    );
}

Dialog.propTypes = {
    onClickOk: PropTypes.func,
    onClickNo: PropTypes.func,
    onClickYes: PropTypes.func,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['decision', 'standard']),
    size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen'])
};

export default Dialog;
