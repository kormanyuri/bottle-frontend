import React, {Component} from 'react';

import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import NavigateBefore from 'material-ui/svg-icons/image/navigate-before';

import NavigationBottom from '../NavigationBottom';
import PanelTop from '../PanelTop';

import WhomSendSetting from './WhomSendSetting';
import Config from '../Config';

const styles = {

    primaryButton: {
        textAlign: 'center',
        width: '50%'
    },
    leftCol: {
        lineHeight: '55px',
        color: '#ffffff',
        fontSize: '16px',
        marginTop: 0,
        marginLeft: 0
    },
    rightCol: {
        lineHeight: '64px',
        color: '#ffffff',
        fontSize: '16px',
        marginTop: 0,
        marginRight: 0
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: '20px'
    }
};

const topPanelTitle = "Кому отправим?";
const PanelTopColLeft =<IconButton href="/#/chats"><NavigateBefore /></IconButton>;
const PanelTopColRight=<IconButton></IconButton>;

export default class WhomSend extends React.Component {

    constructor(props){
        super(props);

        const config = new Config();

        window.localStorage.setItem('process', 'whomSend');

        let whomSetting = window.localStorage.getItem('whomSetting');

        if (!whomSetting) {

            const defaultWhomSetting = config.defaultWhomSetting;

            window.localStorage.setItem('whomSetting', JSON.stringify(defaultWhomSetting));
            whomSetting = defaultWhomSetting;

        } else {
            whomSetting = JSON.parse(whomSetting);
        }

        this.state = {
            RandomUser: whomSetting.isRandom,
            whomSetting: whomSetting,
            config: config
        };

        this.handleChange = this.handleChange.bind(this);
        this.next = this.next.bind(this);
    }


    handleChange(event, RandomUser){
        let whomSetting = this.state.whomSetting;
        whomSetting.isRandom = (RandomUser === 'true' || RandomUser === true);

        this.setState({
            RandomUser: RandomUser,
            whomSetting: whomSetting
        });

        window.localStorage.setItem('whomSetting', JSON.stringify(whomSetting));
    }

    next() {
        window.localStorage.setItem('sendMessageToStack', true);
    }

    render(){

        return (
            <div>

                <PanelTop title={topPanelTitle} colLeft={PanelTopColLeft} colRight={PanelTopColRight} />

                <div className="wrap-content">
                    <div>
                        <Divider />
                        <div className="group-input">
                            <div className="input-row clearfix">
                                <div className="col-60">
                                    <div className="my-label">
                                        Случайный пользователь
                                    </div>
                                </div>
                                <div className="col-40 text-right" style={{paddingRight: 0}}>
                                    <Toggle
                                        defaultToggled={this.state.RandomUser}
                                        onToggle={this.handleChange}
                                        style={{marginTop: 12, marginBottom: 12, display: 'inline-block', width: 'auto'}}
                                    />
                                </div>
                            </div>

                            {this.state.RandomUser ? '' : <WhomSendSetting />}

                            <div className="text-center"  style={{marginTop: '60px'}}>
                                <RaisedButton
                                    href="/#/whom-send/messages"
                                    label="Далее"
                                    primary={true}
                                    style={styles.primaryButton}
                                    onClick={ this.next }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <NavigationBottom />
            </div>
        )
    }
}