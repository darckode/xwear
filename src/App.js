import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser  } from './redux/user/user.actions';

// const HatsPage = () => (
// 	<div>
// 		<h1>HATS PAGE</h1>
// 	</div>
// );

class App extends React.Component {
	// constructor() {
	// 	super();

	// 	this.state = {
	// 		currentUser: null
	// 	}
	// }

	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if(userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot(snapShot => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data()
					});
					// console.log(this.state);
				});
			}
			setCurrentUser(userAuth);
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header/>
			    <Switch>
			    <Route exact={true} path='/' component={HomePage} />
			    <Route exact={true} path='/shop' component={ShopPage} />
			    <Route 
			      exact={true} 
			      path='/signin' 
			      render={() =>
			        this.props.currentUser ? (
			        	<Redirect to='/' />
			        	) : (
			        	<SignInSignUpPage />
			        	)
			        } 
			    />
			    </Switch>
			</div>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser
});


const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
		mapStateToProps, 
		mapDispatchToProps
	)(App);
