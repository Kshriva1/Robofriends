import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundary'
//import { robots } from '../robots';
import './App.css';
import Scroll from '../components/Scroll';
import { connect } from 'react-redux';
import { setSearchField,requestRobots } from '../action.js';

const mapStateToProps = state => {
   return {
     searchField: state.searchRobots.searchField,
     isPending: state.requestRobots.isPending,
     robots: state.requestRobots.robots,
     error: state.requestRobots.error
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
   onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
   onRequestRobots: () => dispatch(requestRobots())
 }
}

class App extends Component {

   componentDidMount() {
      this.props.onRequestRobots();
   }

 

	render() {
      const { searchField,onSearchChange,robots,isPending } = this.props
			const filteredRobots = robots.filter(robots=> {
		
   		return robots.name.toLowerCase().includes(searchField.toLowerCase());
   	})

	if(isPending) {
		return <h1>Loading</h1>
	} else {
   return (
   	<div className='tc'>
   		<h1>RoboFriends</h1>
   		<SearchBox searchChange={onSearchChange}/>
   		<Scroll>
           <ErrorBoundary>
   		    <CardList robots={filteredRobots} />
           </ErrorBoundary>  
   		</Scroll>
   	</div>	
   	);
}
}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);