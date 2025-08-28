// Theme switching functionality
(function() {
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
	
	// Get saved theme or default to light theme
	function getTheme() {
		const saved = localStorage.getItem('theme');
		if (saved) return saved;
		return 'light';
	}
	
	// Apply theme to document
	function applyTheme(theme) {
		document.documentElement.setAttribute('data-theme', theme);
		updateToggleIcon(theme);
	}
	
	// Update toggle button icon
	function updateToggleIcon(theme) {
		const sunIcon = document.querySelector('.sun-icon');
		const moonIcon = document.querySelector('.moon-icon');
		
		if (theme === 'dark') {
			sunIcon.style.display = 'block';
			moonIcon.style.display = 'none';
		} else {
			sunIcon.style.display = 'none';
			moonIcon.style.display = 'block';
		}
	}
	
	// Toggle theme
	function toggleTheme() {
		const currentTheme = document.documentElement.getAttribute('data-theme') || getTheme();
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		
		localStorage.setItem('theme', newTheme);
		applyTheme(newTheme);
	}
	
	// Initialize theme when DOM is loaded
	document.addEventListener('DOMContentLoaded', function() {
		const themeToggle = document.getElementById('theme-toggle');
		const initialTheme = getTheme();
		
		applyTheme(initialTheme);
		
		// Add click listener
		themeToggle.addEventListener('click', toggleTheme);
	});
	
	// Listen for system theme changes
	prefersDark.addEventListener('change', function(e) {
		// Only apply system preference if no manual theme is set
		if (!localStorage.getItem('theme')) {
			applyTheme(e.matches ? 'dark' : 'light');
		}
	});
})();
