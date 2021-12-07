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

	console.log(process.env.GITHUB_TOKEN);
	console.log(process.env.GITHUB_ORG);

	if (process.env.NODE_ENV !== "production") {
		res.set('Access-Control-Allow-Origin', '*');
	}
	if (req.method === 'OPTIONS') {
		// Send response to OPTIONS requests
		res.set('Access-Control-Allow-Methods', 'POST');
		res.set('Access-Control-Allow-Headers', 'Content-Type');
		res.set('Access-Control-Max-Age', '3600');
		res.status(204).send('');
	}

	const octokit = new Octokit({
		auth: process.env.GITHUB_TOKEN,
	}
	);

	const email = req.body.email;
	console.log(email);

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
			res.status(500).send({
				error: err,
				message: 'Error sending invite',
			});
		});
	} else {
		res.status(400).send('Invalid email');
	}
};