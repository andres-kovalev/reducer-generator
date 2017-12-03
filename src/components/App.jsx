import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { actionCreators as counterActionCreators } from '../store/Counter';
import Counter from './Counter';

const mapStateToProps = state => ({
    counter: state.counter
}), mapDispatchToProps = dispatch => ({
    counterActions: bindActionCreators(counterActionCreators, dispatch)
}), App = ({ counter, counterActions }) => <div>
        <Counter { ...counter } { ...counterActions } />
    </div>;

App.propTypes = {
    counter: PropTypes.object.isRequired,
    counterActions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);