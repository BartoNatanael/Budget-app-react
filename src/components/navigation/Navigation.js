import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {Container, List, NavigatorWrapper} from './Navigation.css';

function Navigation({items = [], RightElement}){
    return(
        <Container>
            <NavigatorWrapper>
                <List>
                    {items.map(item => (
                        <li key={item.to}>
                            <Link to={item.to}>{item.content}</Link>
                            </li>
                    ))}
                </List>
                {RightElement}
            </NavigatorWrapper>
        </Container>
    )
}

Navigation.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Navigation;