/**
 *
 * @title ScrollBar
 * @description 容器出现滚动时候
 *
 */

import React, { Component } from 'react';
import ScrollBar from '../../src'

class Demo1 extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <ScrollBar
                    barWidth={30}
                >
                    <div className="content">
                        我的内容很多，占用宽度比较大。我的内容很多，占用宽度比较大。我的内容很多，占用宽度比较大。我的内容很多，占用宽度比较大。
                    </div>
                </ScrollBar>
            </div>
        )
    }
}


export default Demo1;
