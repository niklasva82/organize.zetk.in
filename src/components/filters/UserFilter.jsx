import React from 'react';

import FilterBase from './FilterBase';
import SelectInput from '../forms/inputs/SelectInput';


export default class UserFilter extends FilterBase {
    constructor(props) {
        super(props);

        this.state = {
            is_user: !!props.config.is_user,
        };
    }

    componentReceivedProps(nextProps) {
        if (nextProps.config !== this.props.config) {
            this.setState({
                is_user: !!nextProps.config.is_user,
            });
        }
    }

    renderFilterForm(config) {
        let value = this.state.is_user? 'yes' : 'no';
        let options = {
            'yes': 'filters.user.isUser.yesOption',
            'no': 'filters.user.isUser.noOption',
        };

        return [
            <SelectInput key="isUser" name="is_user"
                labelMsg="filters.user.isUser.label"
                options={ options } value={ value }
                optionLabelsAreMessages={ true }
                onValueChange={ this.onIsUserChange.bind(this) }
                />
        ];
    }

    getConfig() {
        return {
            is_user: !!this.state.is_user,
        };
    }

    onIsUserChange(name, value) {
        console.log(name, value);
        let isUser = (value == 'yes');

        this.setState({ is_user: isUser }, () => this.onConfigChange());
    }
}
