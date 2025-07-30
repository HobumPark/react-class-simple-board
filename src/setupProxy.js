const { createProxyMiddleware } = require('http-proxy-middleware');

const isLocal = process.env.NODE_ENV === 'development';
const target = isLocal ? 'http://localhost:4000' : 'http://mynodetest.cafe24app.com';

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/board', {
			target,
			changeOrigin: true,
		})
	);

	app.use(
		createProxyMiddleware('/board/*', {
			target,
			changeOrigin: true,
		})
	);

	app.use(
		createProxyMiddleware('/board/insert', {
			target,
			changeOrigin: true,
		})
	);

	app.use(
		createProxyMiddleware('/board/delete/*', {
			target,
			changeOrigin: true,
		})
	);

	app.use(
		createProxyMiddleware('/board/update/*', {
			target,
			changeOrigin: true,
		})
	);

	app.use(
		createProxyMiddleware('/board/search/*', {
			target,
			changeOrigin: true,
		})
	);

	app.use(
		createProxyMiddleware('/board/increase/*', {
			target,
			changeOrigin: true,
		})
	);

	app.use(
		createProxyMiddleware('/board/prevAndNext/*', {
			target,
			changeOrigin: true,
		})
	);
};
