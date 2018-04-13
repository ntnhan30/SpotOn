import React, { Component, Fragment } from 'react'
import {
	Accordion,
	AccordionItem,
	AccordionItemTitle,
	AccordionItemBody
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/minimal-example.css'
var _ = require('lodash')

class SpotOnGlossary extends Component {
	render() {
		return (
			<Fragment>
				<div id="filter">
					<h5>Filter</h5>
					<p>Image of filter</p>
				</div>

				<div id="brand">
					<h5>Brand</h5>
					<p>
						The company or the brand that was promoted through the
						advertisement.
					</p>
				</div>

				<div>
					<h5>Channel</h5>
					<p>
						The media platform on which the ad was aired, e.g. TV.{' '}
					</p>
				</div>
				<div>
					<h5>Country</h5>
					<p>
						This shows the location where the ad was aired or
						planned.{' '}
					</p>
				</div>

				<div>
					<h5>Date</h5>
					<p>
						This shows calendar month when the spot was aired.
						However, the new ads/ideas that haven’t aired don’t
						contain a date.{' '}
					</p>
				</div>

				<div>
					<h5>Industry</h5>
					<p>
						The spots have been organized into four categories;
						‘Food delivery’ e.g. Domicilios, ‘Non-food offline’ e.g.
						Head & Shoulders, ‘Offline food’ e.g. Coca Cola, ‘Online
						ordering (non-food)’ e.g. Trivago.
					</p>
				</div>

				<div id="length">
					<h5>Length</h5>
					<p>The duration of the ad in seconds. </p>
				</div>

				<div>
					<h5>Production Status</h5>
					<p>
						There are two different production states; aired and not
						aired. Production_Status Description ANIMATED NOT aired
						GREENBOX SCRIPT FINISHED AIRED Aired before or being
						aired
					</p>
				</div>

				<div>
					<h5>Menus and others</h5>
					<p>IMAGE OF MENU</p>
				</div>

				<div>
					<h5>Chart</h5>
					<p>
						This is where you are shown an overall look at the
						SpotON score for each ad selected, as well as a
						breakdown of the L1 and L2 KPIs in the form of graphs.
						By hovering over the graphs you can see what each colour
						indicates, with different ads shown under the ‘L1 KPIs’
						tab while L2 KPIs are broken down under the ‘Brand
						Relevance’, ‘Viewer Engagement’ and ‘Ad Message’ tabs.
						All of these elements are shown on the final tab,
						labelled ‘KPIs Details’.
					</p>
				</div>

				<div>
					<h5>Percentile</h5>
					<p>
						The percentile score is calculated by the weighted score
						and shows how the ad compares to the rest of the ads in
						the same country. This gives the spot a relative
						position among the compared group, and can be best used
						when comparing ads from different countries (the higher
						the score, the better the ad performs!). The above chart
						shows the percentile score for two Colombian ads (HOLA
						and BODY) and three German ads (TRUEHERO_PUMP,
						ABOUTYOU_ABOUT YOU and ABZOCKER_OV). In this instance,
						ABOUTYOU_ABOUT YOU and HOLA both rank highly at 97th and
						85th in the compared group when it comes to the SpotON
						score compared to TRUEHERO_PUMP, which is in a low
						position at 3rd.
					</p>
				</div>

				<div>
					<h5>SpotON Score</h5>
					<p>
						The total score which is the weighted average of Level 1
						KPIs. (i.e. Brand Relevance 30%, Viewer Engagement 40%
						and Ad Message 30%) For more details on the KPIs, please
						take a look at the KPI Glossary.
					</p>
				</div>

				<div>
					<h5>(Total) country norm</h5>
					<p>
						The average of the SpotON scores of all the ads
						researched in the country. This total exists both
						overall and per KPI.
					</p>
				</div>

				<div>
					<h5>Weighted</h5>
					<p>
						Each answer option in the survey questionnaires and
						L1/L2 KPIs carry different weights in terms of
						calculating the higher level KPIs (read on to see the
						different weights!). If the gap between the ad’s score
						and the overall country norm is bigger than 7pp or 15pp,
						it will be indicated by green (positive) and red
						(negative) tags - the bolder the colour, the bigger the
						gap! Please note that at least five ads need to be
						selected in order to view colour tags in the
						‘Percentile’ chart. Each country norm is listed on the
						‘Country norm’ tab to the right of the table.
						<br />
						The above chart shows two ads from Germany (ABZOCKER_OV
						and TRUEHERO_PUMP) and two from Colombia (HOLA and
						BODY). In this instance, the SpotON country norm for
						Germany is 66, meaning TRUEHERO_PUMP is 19pp below at
						47, resulting in a bold red tag. This can also be seen
						with Viewer Engagement, which at 42 is 23pp below the
						country norm of 65. Germany’s ABZOCKER_OV, however, does
						well in Viewer Engagement; the Ad Appeal number 89 is
						10pp above the country norm of 79, giving it a green
						tag, Meanwhile Shareability at 48 is 17pp above the
						country norm of 31, resulting in a bold green tag.
					</p>
				</div>
			</Fragment>
		)
	}
}

export default SpotOnGlossary
