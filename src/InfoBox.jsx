import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import './InfoBox.css';


function InfoBox({title, cases, total, ...props}) {
    return (
        <div>
            <Card className='infoBox' styles={{flex: 0.2}} onClick={props.onClick}>
                <CardContent>
                <Typography className='infoBox__title' color='textSecondary'>{title}</Typography>
                <h2 className='infoBox__cases'>{cases} cases today</h2>
                <Typography className='infoBox__total' color='textSecondary'>{total} total</Typography>
                </CardContent>
            </Card>
            
        </div>
    )
}

export default InfoBox
