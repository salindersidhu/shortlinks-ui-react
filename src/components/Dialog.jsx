import PropTypes from 'prop-types';
import React from 'react';
import { Modal, Transition } from 'semantic-ui-react';

function Dialog(props) {
    return (
        <Transition
            visible={props.active}
            duration={props.duration}
            animation={props.animation}
        >
            <Modal
                size={props.size}
                open={props.active}
                onClose={props.onClose}
            >
                {props.header}
                <Modal.Content>
                    {props.content}
                </Modal.Content>
                <Modal.Actions>
                    {props.actions}
                </Modal.Actions>
            </Modal>
        </Transition>
    );
}

Dialog.propTypes = {
    duration: PropTypes.number,
    animation: PropTypes.string,
    active: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    header: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen'])
};

export default Dialog;
