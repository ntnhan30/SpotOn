import React, { Component, Fragment } from 'react'
import { SpotOnGlossary, KPIGlossary, FAQ, UsageGuideline } from '../userGuide'
import {
	Accordion,
	AccordionItem,
	AccordionItemTitle,
	AccordionItemBody
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/minimal-example.css'

class UserGuideScreen extends Component {
	render() {
		return (
			<Fragment>
				<div className="container-fluid main">
					<div className="col-2 sidebar" id="filter">
						<div>
							<Accordion>
								<AccordionItem>
									<AccordionItemTitle>
										<h3>Spoton Glossary</h3>
									</AccordionItemTitle>
									<AccordionItemBody>
										<h5>Filter</h5>
										<h5>Brand</h5>
										<h5>Channel</h5>
										<h5>Country</h5>
										<h5>Date</h5>
										<h5>Industry</h5>
										<h5>
											<a href="#length">Length</a>
										</h5>
										<h5>Production Status</h5>
										<h5>Menus and others</h5>
										<h5>Chart</h5>
										<h5>Percentile</h5>
										<h5>SpotON Score</h5>
										<h5>(Total) country norm</h5>
										<h5>Weighted</h5>
									</AccordionItemBody>
								</AccordionItem>

								<AccordionItem>
									<AccordionItemTitle>
										<h3>KPI Glossary</h3>
									</AccordionItemTitle>
									<AccordionItemBody>
										<h5>Brand Relevance</h5>
										<h5>Viewer Engagement</h5>
										<h5>Ad Message</h5>
									</AccordionItemBody>
								</AccordionItem>

								<AccordionItem>
									<AccordionItemTitle>
										<h3>FAQs</h3>
									</AccordionItemTitle>
									<AccordionItemBody>
										<h4>What can I do with SpotON?</h4>
										<h4>
											How are the weighted and percentile
											scores calculated?
										</h4>
										<h4>What does each KPI indicate?</h4>
										<h4>
											Which survey questionnaires are
											asked for SpotON?
										</h4>
										<h4>
											What is the approximate cost for the
											survey?
										</h4>
										<h4>
											Can I view information from other
											markets?
										</h4>
										<h4>
											Why can’t I see the country norm
											when looking at the charts
										</h4>
										<h4>
											On what criteria have the spots been
											selected for testing?
										</h4>
										<h4>
											Can we add new spots to the existing
											ones?
										</h4>
										<h4>
											Who shall I contact to get more info
											on the SpotON?
										</h4>
										<h4>
											Where can I watch the spots I'm
											interested in?
										</h4>
										<h4>
											I can't access the tool. How can I
											get support?
										</h4>
									</AccordionItemBody>
								</AccordionItem>

								<AccordionItem>
									<AccordionItemTitle>
										<h3>Usage Guidelines</h3>
									</AccordionItemTitle>
									<AccordionItemBody>
										<h4>Contact persons for SpotON</h4>
										<h4>Exporting</h4>
										<h4>Dividing results</h4>
										<h4>Naming</h4>
										<h4>
											Updating information on the google
											drive
										</h4>
										<h4>Uploading</h4>
									</AccordionItemBody>
								</AccordionItem>
							</Accordion>
						</div>
					</div>

					<div className="col-10 main-content">
						<SpotOnGlossary />
						<KPIGlossary />
						<FAQ />
						<UsageGuideline />
					</div>
				</div>
			</Fragment>
		)
	}
}

export default UserGuideScreen
