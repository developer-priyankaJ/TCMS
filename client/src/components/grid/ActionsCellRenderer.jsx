import React, {Component} from "react";

export default class ActionsCellRenderer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
              <a className="display-inline" href="javascript:void();" onClick={(event)=>this.props.context.componentParent.clickHandler("delete",this.props.data.lr_no)}><div className={"delete-icon"}></div></a>
              <a className="display-inline" href="javascript:void();" onClick={(event)=>this.props.context.componentParent.clickHandler("edit",this.props.data.lr_no)}><div className={"edit-icon"}></div></a>
            </div>
        );
    }
};
