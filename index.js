try {
	const fs = require('fs');
	const path = require('path');
	const { execSync } = require('child_process');

	const distDir = path.join(__dirname, 'frontend', 'dist');

		if (!fs.existsSync(distDir)) {
			console.warn('Frontend dist not found — expected build to run during image build.');
		}

		require('./frontend/server.cjs');
} catch (err) {
	// Fallback log for runtime environments that don't support ESM imports at root
	console.error('Failed to start frontend server from root index.js:', err);
	process.exit(1);
}
