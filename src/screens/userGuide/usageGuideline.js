import React, { Component, Fragment } from 'react'

class UsageGuideline extends Component {
	render() {
		return (
			<Fragment>
				<div>
					<h4>Contact persons for SpotON</h4>
					<p>
						General info/plans - Marina Kramer,
						marina.kramer@deliveryhero.com KPIs and Research - Don
						Lee, donwon.lee@deliveryhero.com or Frederic Lamotte,
						frederic.lamotte@deliveryhero.com Technical questions -
						Andres Guevara, andres.guevara@deliveryhero.com
					</p>
				</div>
				<div>
					<h4>Exporting</h4>
					<p>
						To CSV - delimited by using a semicolon (;). This means
						you cannot use semicolons in any other text in the ad
						list or results. Please only export exactly what you
						need, and leave no rows or columns blank.
					</p>
				</div>
				<div>
					<h4>Dividing results</h4>
					<p>We recommend dividing the CSV by countries.</p>
				</div>

				<div>
					<h4>Naming</h4>
					<p>
						Ad naming The ad name needs to match the name in the
						results. Please do not change the name of the ad as this
						will affect viewing! Column names The names cannot have
						blank spaces between words and numbers, please separate
						with an underscore ( _ ). Special characters Please do
						not use any special characters (e.g. & $ # ä ú). English
						alphabet letters only.
					</p>
				</div>

				<div>
					<h4>Updating information on the google drive</h4>
					<p>
						Any changes such as ads for testing, survey
						questionnaires in each language, quotes, attributes and
						variables should be immediately notified to the SpotON
						contact persons so that they can reflected on the
						project plan SpotON file on Google Drive.
					</p>
				</div>

				<div>
					<h4>Uploading</h4>
					<p>
						Please ensure you upload the spot itself before you
						upload its results!
					</p>
				</div>
			</Fragment>
		)
	}
}

export default UsageGuideline
