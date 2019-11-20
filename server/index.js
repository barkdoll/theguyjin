const express = require('express');
const { static } = express;
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express();
const { readdirSync } = require('fs');
const { resolve } = require('path');

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {

	// Init Nuxt.js
	const nuxt = new Nuxt(config)

	const { host, port } = nuxt.options.server

	// Build only in dev mode
	if (config.dev)
	{
		const builder = new Builder(nuxt)
		await builder.build()
	}
	else
	{
		await nuxt.ready()
	}


	readdirSync(resolve('./content')).map(file => {
		const routePath = resolve(`./content/${file}`);
		console.log(routePath)
		app.use(static(routePath));
	})

	// Give nuxt middleware to express
	app.use(nuxt.render)

	// Listen the server
	app.listen(port, host)
	consola.ready({
		message: `Server listening on http://${host}:${port}`,
		badge: true
	});
}
start()
