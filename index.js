const { Octokit } = require("@octokit/rest");
/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.requestinvite = (req, res) => {
	const octokit = new Octokit({
		auth: process.env.GITHUB_TOKEN,
	}
	);

	const email = req.body.email;

	// Clean up the email
	const email_clean = email.toLowerCase().trim();

	// check if email is valid University email
	const universityDomains = [
		'@myport.ac.uk',
		'@port.ac.uk',
	];
	const universityEmail = universityDomains.some(domain => email_clean.endsWith(domain));

	// Send invite
	if (universityEmail) {
		// add user to github org
		octokit.orgs.createInvitation({
			org: process.env.GITHUB_ORG,
			email: email_clean,
		}).then(() => {
				res.status(200).send('Invite sent');
			}
		).catch(err => {
				res.status(500).send('Invite failed');
		});
	} else {
		res.status(400).send('Invalid email');
	}
};