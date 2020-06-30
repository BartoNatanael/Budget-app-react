import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {Container, List, NavigatorWrapper} from './Navigation.css';

function Navigation({items = [], RightElement}){
    const { t } = useTranslation();
    return(
        <Container>
            <NavigatorWrapper>
                <List>
                    {items.map(item => (
                        <li key={item.to}>
                            <Link to={item.to}>{t(item.content)}</Link>
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