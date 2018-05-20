import React, { Component } from 'react';
import logo from './logo.svg';

import { Motion, spring } from 'react-motion';
import Animated from 'animated/lib/targets/react-dom';
import Easing from 'animated/lib/Easing';

import './App.css';

class App extends Component {
    state = {
        focused: false,
        height: 38
    }
    componentDidMount() {
        this.input.addEventListener('focus', this.focus);
        this.input.addEventListener('blur', this.focus);
    }
    focus = () => {
        this.setState((state) => ({ focused: !state.focused }))
    }

    animate = () => {
        this.setState((state) => ({ height: state.height === 233 ? 38 : 233 }))
    }

    animatedValue = new Animated.Value(0)
    animate2 = () => {
        this.animatedValue.setValue(0)
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.elastic(1)
            }
        ).start();
    }

    render() {

        const marginLeft = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-120, 0],
        });
        return (
              <div className="App">
                  <div className="container">
                      <input
                        ref={input => this.input = input}
                        className={['input', this.state.focused && 'input-focused'].join(' ')}
                        />
                  </div>
                  <div style={styles.button} onClick={this.animate}>Animate</div>
                  <Motion style={{ height: spring(this.state.height) }}>
                      {
                          ({ height }) => <div style={Object.assign({}, styles.menu, { height } )}>
                              <p style={styles.selection}>Selection 1</p>
                              <p style={styles.selection}>Selection 2</p>
                              <p style={styles.selection}>Selection 3</p>
                              <p style={styles.selection}>Selection 4</p>
                              <p style={styles.selection}>Selection 5</p>
                              <p style={styles.selection}>Selection 6</p>
                          </div>
                      }
                  </Motion>
                <br/>
                  <div style={styles.button} onClick={this.animate2}>Animate</div>
                  <Animated.div
                      style={
                          Object.assign(
                              {},
                              styles.box,
                              { opacity: this.animatedValue, marginLeft })}>
                      <p>Thanks for your submission!</p>
                  </Animated.div>
              </div>
        );
  }
}

const styles = {
    menu: {
        overflow: 'hidden',
        border: '2px solid #ddd',
        width: 300,
        marginTop: 20,
    },
    selection: {
        padding: 10,
        margin: 0,
        borderBottom: '1px solid #ededed'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        cursor: 'pointer',
        width: 200,
        height: 45,
        border: 'none',
        borderRadius: 4,
        backgroundColor: '#ffc107',
    },
}

export default App;
