import React, {Component} from "react";

export default class LinkCellRenderer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href="javascript:void();" onClick={(event)=>this.props.context.componentParent.clickHandler("openDetails",this.props.data.lr_no)}>{this.props.data.invoice_no}</a>
        );
    }
};
