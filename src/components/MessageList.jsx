import React from 'react';
import PropTypes from 'prop-types';
import { List, Message } from 'semantic-ui-react';

function MessageList({ list, listItemIcon, listItemContentStyles, ...rest }) {
    return <Message hidden={list.length === 0} {...rest}>
        <List>
            {list.map(item => (
                <List.Item key={item}>
                    {listItemIcon ? <List.Icon name={listItemIcon}/> : ''}
                    <List.Content style={listItemContentStyles}>
                        <b>{item}</b>
                    </List.Content>
                </List.Item>
            ))}
        </List>
    </Message>;
}

MessageList.propTypes = {
    listItemIcon: PropTypes.string,
    list: PropTypes.array.isRequired,
    listItemContentStyles: PropTypes.object
};

export default MessageList;
