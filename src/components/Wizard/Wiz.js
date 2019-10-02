import React, { Component } from 'react';



class Wiz extends Component {
    // constructor() {
    //     super()
    //     window.globalv = this
    // }


    // callit(data){
    //     alert(data)
    // }

	state = {
		pageIndex: 0
    };



	render() {
		const renderProps = {
			navigateBack: this._navigateBack,
            navigateNext: this._navigateNext,
            navigateToPage: this._navigateToPage,            
            pageIndex: this.state.pageIndex,            
			renderPage: this._renderPage
		};
		return this.props.children(renderProps);
    }
    

    _navigateToPage = pageIndex => {
        this.setState({pageIndex: pageIndex})
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
				{...formProps}
				navigateBack={this._navigateBack}
                navigateNext={this._navigateNext}
                navigateToPage={this._navigateToPage}                
				pageIndex={pageIndex}
			/>
		);
	};
}

export default Wiz;
