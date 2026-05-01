try {
	require('./frontend/server.js');
} catch (err) {
	// Fallback log for runtime environments that don't support ESM imports at root
	console.error('Failed to start frontend server from root index.js:', err);
	process.exit(1);
}
