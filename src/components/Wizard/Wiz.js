import React, { Component } from 'react';

//import RequestHandler from 'graphql/ie/requestHandler';
import {connect} from 'formik'



class Wiz extends Component {

	state = {
		pageIndex: 0
    };

	render() {        
		const renderProps = {
			navigateBack: this._navigateBack,
            navigateNext: this._navigateNext,
            navigateToPage: this._navigateToPage,            
            pageIndex: this.state.pageIndex,            
            renderPage: this._renderPage,
            handleRequest: this._handleRequest
		};
		return this.props.children(renderProps);
    }
    

    _navigateToPage = pageIndex => {
        this.setState({pageIndex: pageIndex})
    }   
    
    _handleRequest = (req) => {        
        console.log("this.props", this.props)
    }

	_navigateBack = () => {
		this.setState(prevState => ({
			pageIndex: prevState.pageIndex - 1 < 0 ? prevState.pageIndex - 1 : 0
		}));
	};

	_navigateNext = () => {
		this.setState(prevState => ({
			pageIndex: prevState.pageIndex + 1
		}));
	};

	_renderPage = formProps => {
		const { pageIndex } = this.state;

		const Page = this.props.pages[pageIndex];

		return (
			<Page
                page={this.props.pages[pageIndex].name}
				{...formProps}
				navigateBack={this._navigateBack}
                navigateNext={this._navigateNext}
                navigateToPage={this._navigateToPage}    
                handleRequest={this._handleRequest}            
				pageIndex={pageIndex}
			/>
		);
	};
}

export default connect(Wiz);
