import React from 'react';
import PropTypes from 'prop-types';
import { Modal, TransitionablePortal } from 'semantic-ui-react';

function AnimatedModal(props) {
    return <TransitionablePortal
        open={props.open}
        transition={{
            duration: props.duration,
            animation: props.animation
        }}
    >
        <Modal
            open={true}
            size={props.size}
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
    </TransitionablePortal>;
}

AnimatedModal.propTypes = {
    size: PropTypes.string,
    duration: PropTypes.number,
    animation: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    header: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

AnimatedModal.defaultProps = {
    size: 'fullscreen',
    duration: 500,
    animation: 'scale'
};

export default AnimatedModal;
