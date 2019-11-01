import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
    Image,
    Loader,
    Visibility
} from 'semantic-ui-react';

function LazyImage(props) {
    const [show , setShow] = useState(false);

    function showImage() {
        setShow(true);
    }

    return !show ? <Visibility>
        <Visibility as='span' onTopVisible={showImage}>
            <Loader active inline='centered' size={props.size} />
        </Visibility>
    </Visibility> : <Image {...props} />;
}

LazyImage.propTypes = {
    size: PropTypes.string,
    src: PropTypes.string.isRequired
};

LazyImage.defaultProps = {
    size: 'medium'
};

export default LazyImage;
