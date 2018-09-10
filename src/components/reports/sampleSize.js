import React, { Component, Fragment } from 'react'
import ReactTooltip from 'react-tooltip'
import { findDOMNode } from 'react-dom'


class SampleSize extends Component {

	render() {
		let { sampleSize } = this.props

		if (sampleSize > 50) {
			return (
				<span className="sampleSize">{sampleSize}</span>
			)
		} else {
			return (
				<Fragment>
					<span style={{ color: '#ff132b', fontWeight: 700 }} className="sampleSize" ref='foo' data-tip='Sample size is too small' onClick={() => { ReactTooltip.show(findDOMNode(this.refs.foo)) }}>{sampleSize}</span>
					<ReactTooltip
						place={'bottom'}
						type={'error'}
					/>
				</Fragment>
			)
		}

	}
}

export default SampleSize
