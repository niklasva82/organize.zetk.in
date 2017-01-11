import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import PaneBase from './PaneBase';
import Button from '../misc/Button';
import { getListItemById } from '../../utils/store';
import { saveTextDocument, finishTextDocument } from '../../actions/document';

let RichTextEditor = null;
if (typeof window != 'undefined') {
    RichTextEditor = require('react-rte').default;
}


@connect(state => state)
@injectIntl
export default class EditTextPane extends PaneBase {
    constructor(props) {
        super(props);

        let docId = this.getParam(0);
        let docList = this.props.documents.docList;
        let docItem = getListItemById(docList, docId);
        let html = docItem.data.content;

        this.state = {
            inBrowser: false,
            value: RichTextEditor.createValueFromString(html, 'html'),
        };
    }

    getRenderData() {
        let docId = this.getParam(0);
        let docList = this.props.documents.docList;

        return {
            docItem: getListItemById(docList, docId),
        };
    }

    getPaneTitle(data) {
        const formatMessage = this.props.intl.formatMessage;
        return formatMessage({ id: 'panes.editText.title' });
    }

    renderPaneContent(data) {
        if (this.state.inBrowser) {
            let toolbarConfig = {
                INLINE_STYLE_BUTTONS: [
                    { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
                    { label: 'Italic', style: 'ITALIC' },
                    { label: 'Underline', style: 'UNDERLINE' },
                ],
                BLOCK_TYPE_DROPDOWN: [
                    { label: 'Normal', style: 'unstyled' },
                    { label: 'Heading Large', style: 'header-one' },
                    { label: 'Heading Medium', style: 'header-two' },
                    { label: 'Heading Small', style: 'header-three' },
                ],
                BLOCK_TYPE_BUTTONS: [
                    { label: 'UL', style: 'unordered-list-item' },
                    { label: 'OL', style: 'ordered-list-item' },
                ],
            };

            return [
                <RichTextEditor key="editor"
                    className="EditTextPane-editor"
                    value={ this.state.value }
                    toolbarConfig={ toolbarConfig }
                    onChange={ this.onChange.bind(this) }/>,
            ];
        }
        else {
            return null;
        }
    }

    renderPaneFooter(data) {
        return [
            <Button key="closeButton"
                className="EditTextPane-closeButton"
                labelMsg="panes.editText.closeButton"
                onClick={ this.onClickCancel.bind(this) }/>,
            <Button key="saveButton"
                className="EditTextPane-saveButton"
                labelMsg="panes.editText.saveButton"
                onClick={ this.onClickFinish.bind(this) }/>,
        ];
    }

    componentDidMount() {
        this.setState({
            inBrowser: true,
        });
    }

    onClickFinish(ev) {
        let docId = this.getParam(0);
        let html = this.state.value.toString('html');

        this.props.dispatch(saveTextDocument(docId, html));
        this.props.dispatch(finishTextDocument(docId));
        this.closePane();
    }

    onClickCancel(ev) {
        this.closePane();
    }

    onChange(value) {
        this.setState({ value });
    }
}
