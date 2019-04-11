import React, { Component } from 'react';
import * as Animated from 'animated/lib/targets/react-dom';
import './App.css';

const balls = new Array(200).fill();

class AnimatedShape extends Component {
    anim = new Animated.Value(0);

    state = {
        centerPointX: null,
        centerPointY: null,
        width: 88,
        height: 88
    };

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove = ({ clientX, clientY }) => {
        Animated.event([this.anim])(
            Math.abs(this.state.centerPointX - clientX) +
                Math.abs(this.state.centerPointY - clientY)
        );
    };

    getRandomArbitrary = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    render() {
        return (
            <Animated.div
                ref={ref => {
                    if (this.state.centerPointX === null) {
                        this.setState({
                            centerPointX:
                                ref.refs.node.offsetLeft + this.state.width / 2
                        });
                    }

                    if (this.state.centerPointY === null) {
                        this.setState({
                            centerPointY:
                                ref.refs.node.offsetTop + this.state.height / 2
                        });
                    }
                }}
                style={{
                    width: this.state.width,
                    height: this.state.height,
                    margin: 16,
                    backgroundImage: 'linear-gradient(skyblue 0%, #bae 30%)',
                    // backgroundColor: '#41c841',
                    // backgroundColor: this.anim.interpolate({
                    //     inputRange: [0, 80],
                    //     outputRange: ['#41c841', '#f0f'],
                    //     extrapolate: 'clamp'
                    // }),
                    borderRadius: '50%',
                    transition: 'all 600ms cubic-bezier(0.24, 0.95, 1, 0.5)',
                    willChange: 'transform',
                    // transitionDelay: `${this.getRandomArbitrary(0, 16)}ms`,
                    transform: [
                        {
                            scale: this.anim.interpolate({
                                inputRange: [0, 200],
                                outputRange: [4, 1],
                                extrapolate: 'clamp'
                            })
                        }
                    ]
                }}
            />
        );
    }
}

class App extends Component {
    render() {
        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    backgroundColor: '#000',
                    filter: 'blur(80px) contrast(180)'
                }}
            >
                {balls.map((ball, index) => (
                    <AnimatedShape x={this.x} y={this.y} />
                ))}
            </div>
        );
    }
}

export default App;
