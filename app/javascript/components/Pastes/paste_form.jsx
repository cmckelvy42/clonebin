import React from "react";
import {getCSRFToken} from "../../util/misc"

class PasteForm extends React.Component{
    constructor(props){
        super(props);
        this.redirect = false;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = Object.assign({}, this.props.paste);
    }

    update(property){
        return e => this.setState({[property]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.submitPaste(this.state);
        this.redirect = true;
    }

    privateSelection(){
        if (!this.props.signedIn){
            return <option value='2' disabled>Private</option>;
        } else {
            return <option value='2'>Private</option>
        }
    }

    render(){
        const csrf_token = getCSRFToken();
        return(<div>
            <div className="content-title -no-border">{this.props.formType}</div>
            <form onSubmit={this.handleSubmit}>
            <div>
                <input
                    type="hidden"
                    name="authenticity_token"
                    value={csrf_token}/>
                    <textarea 
                        id="pasteform-content" 
                        value={this.state.content} 
                        onChange={this.update('content')}
                    />
            </div>
            <div className="content-title">Optional Paste Settings</div>
            <div className="form-frame">
                <div>
                    <label htmlFor="pasteform-expiration">Paste Expiration</label>
                    <select id="pasteform-expiration" onChange={this.update('expiration_selection')}>
                        <option value="0">Never</option>
                        <option value="1">10 Minutes</option>
                        <option value="2">1 hour</option>
                        <option value="3">1 day</option>
                        <option value="4">1 week</option>
                        <option value="5">2 weeks</option>
                        <option value="6">1 month</option>
                        <option value="7">6 months</option>
                        <option value="8">1 year</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="pasteform-privacy">Paste Privacy</label>
                    <select id="pasteform-privacy" onChange={this.update('privacy')}>
                        <option value='0'>Public</option>
                        <option value='1'>Unlisted</option>
                        {this.privateSelection()}
                    </select>
                </div>
                <div>
                    <label htmlFor="pasteform-title">Title</label>
                    <input id="pasteform-title" type="text" value={this.state.title} onChange={this.update('title')}></input>
                </div>
                <button>{this.props.formType}</button>
            </div>
            </form>
        </div>)
    }
}

export default PasteForm;