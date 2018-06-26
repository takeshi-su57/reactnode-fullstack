const api = require('../features/app/app.controller');

module.exports = async (req, res, file) => {
  try {
    const appData = await api.content(req);

    const renderedHtml = file
      .replace(
        '{{PRELOADEDSTATE}}',
        `<script>window.__PRELOADEDSTATE__ = ${JSON.stringify(appData).replace(/</g, '\\u003c')}
                  window.ssrEnabled = ${false}
              </script>`
      )
      .replace('{{SSR}}', '<div id="app"></div>')
      .replace(/{{app_title}}/g, appData.content.app_title)
      .replace(/{{app_description}}/g, appData.content.app_description);
    return res.send(renderedHtml);
  } catch (err) {
    return res.status(500).send(`${err.toString()}\n${err.stack.toString()}`);
  }
};
