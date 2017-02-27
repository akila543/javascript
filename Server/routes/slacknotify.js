const Router = require('express').Router();
const MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
const slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);


Router.get('/slacknotify', function(req, response) {

  slack.send({
  channel: "ci",
  icon_emoji: ":ghost:",
  text: req.body.result,
  username: "@orchestropus"
});
     response.send('msg sent');

});

module.exports = Router;
 