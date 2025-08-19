/**
 * Smooth scroll utility function using Lenis
 * @param {Event} e - The event object
 * @param {string} target - The target selector (e.g., '#about', '#projects', '#')
 */
export const handleSmoothScroll = (e, target) => {
    e.preventDefault();

    if (target === "#") {
        // Scroll to top for home
        if (window.lenis) {
            window.lenis.scrollTo(0);
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    } else {
        // Scroll to specific section
        const element = document.querySelector(target);
        if (element) {
            if (window.lenis) {
                window.lenis.scrollTo(element);
            } else {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }

    // Prevent hash from being added to URL
    history.replaceState(null, null, window.location.pathname);
};

/**
 * Smooth scroll with callback function (useful for closing menus, etc.)
 * @param {Event} e - The event object
 * @param {string} target - The target selector
 * @param {Function} callback - Optional callback function to execute after scroll
 */
export const handleSmoothScrollWithCallback = (e, target, callback) => {
    handleSmoothScroll(e, target);

    // Execute callback if provided
    if (callback && typeof callback === "function") {
        callback();
    }
};
