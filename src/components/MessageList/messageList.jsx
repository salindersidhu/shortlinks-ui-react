import React from 'react';
import PropTypes from 'prop-types';
import { List, Message } from 'semantic-ui-react';

export default function MessageList(props) {
    const { list, itemIcon, itemStyles, ...rest } = props;
    return (
        <Message hidden={list.length < 1} {...rest}>
            <List>
                {list.map((item, index) => (
                    <List.Item key={index}>
                        {itemIcon ? <List.Icon name={itemIcon}/> : ''}
                        <List.Content>
                            <b>{item}</b>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </Message>
    );    
}

MessageList.propTypes = {
    itemIcon: PropTypes.string,
    list: PropTypes.array.isRequired
};
