/**
 * ===================================
 * CONTACT FORM HANDLER
 * AZITALIA RESTAURANT TEMPLATE
 * ===================================
 */

/**
 * EmailJS Configuration
 * Initialize EmailJS service for contact form submissions
 */
(function() {
    try {
        // Initialize EmailJS with your public key
        emailjs.init("zu4dAJAq9XfJx0B_c"); // Replace with your EmailJS public key
    } catch (error) {
        console.error('Error initializing EmailJS:', error);
    }
})();

/**
 * Contact Form Controller
 * Handles form validation, submission, and user feedback
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Form elements
        const form = document.querySelector('.contact-us form');
        const submitBtn = form.querySelector('.contact-button');

        if (!form || !submitBtn) {
            console.error('Contact form elements not found');
            return;
        }

        // Create alert container
        const formAlert = createAlertContainer(form);

        // Setup loading states
        const { spinner, buttonText } = setupLoadingState(submitBtn);

        // Form submission handler
        form.addEventListener('submit', handleFormSubmission);

        // Button click handler (converts link to submit action)
        submitBtn.addEventListener('click', function(e) {
            try {
                e.preventDefault();
                form.dispatchEvent(new Event('submit'));
            } catch (error) {
                console.error('Error handling button click:', error);
            }
        });

        /**
         * Create Alert Container
         * Creates and appends alert message container to form
         */
        function createAlertContainer(formElement) {
            const alert = document.createElement('div');
            alert.id = 'contactFormAlert';
            alert.className = 'alert d-none text-center mt-3';
            formElement.appendChild(alert);
            return alert;
        }

        /**
         * Setup Loading State Elements
         * Creates spinner and button text elements for loading feedback
         */
        function setupLoadingState(button) {
            const spinner = document.createElement('div');
            spinner.className = 'spinner-border spinner-border-sm d-none';
            spinner.setAttribute('role', 'status');

            const buttonText = document.createElement('span');
            buttonText.className = 'button-text';
            buttonText.textContent = 'Send';

            const submitLink = button.querySelector('a');
            submitLink.textContent = ''; // Clear existing text
            submitLink.appendChild(spinner);
            submitLink.appendChild(buttonText);

            return { spinner, buttonText };
        }

        /**
         * Handle Form Submission
         * Validates form data and sends via EmailJS
         */
        async function handleFormSubmission(e) {
            try {
                e.preventDefault();

                // Reset validation state
                form.classList.remove('was-validated');
                hideAlert();

                // Get and validate form data
                const formData = getFormData();
                if (!validateFormData(formData)) {
                    return;
                }

                // Show loading state
                setLoading(true);

                // Send email via EmailJS
                await sendEmail(formData);

            } catch (error) {
                console.error('Error during form submission:', error);
                showAlert('An unexpected error occurred. Please try again.', 'danger');
            } finally {
                setLoading(false);
            }
        }

        /**
         * Get Form Data
         * Extracts and returns form input values
         */
        function getFormData() {
            const nameInput = form.querySelector('input[type="text"]');
            const emailInput = form.querySelector('input[type="email"]');
            const phoneInput = form.querySelector('input[placeholder="Phone"]');
            const messageInput = form.querySelector('textarea');

            return {
                username: nameInput ? nameInput.value.trim() : '',
                email: emailInput ? emailInput.value.trim() : '',
                phone: phoneInput ? phoneInput.value.trim() : '',
                message: messageInput ? messageInput.value.trim() : ''
            };
        }

        /**
         * Validate Form Data
         * Performs comprehensive form validation
         */
        function validateFormData(data) {
            // Required field validation
            if (!data.username || !data.email || !data.phone || !data.message) {
                showAlert('Please fill in all fields', 'danger');
                return false;
            }

            // Email format validation
            if (!validateEmail(data.email)) {
                showAlert('Please enter a valid email address', 'danger');
                return false;
            }

            // Phone number validation
            if (!validatePhone(data.phone)) {
                showAlert('Please enter a valid phone number', 'danger');
                return false;
            }

            return true;
        }

        /**
         * Send Email via EmailJS
         * Sends form data using EmailJS service
         */
        async function sendEmail(data) {
            try {
                const response = await emailjs.send(
                    "service_ly3ltxi", // Replace with your EmailJS service ID
                    "template_7xp17ju", // Replace with your EmailJS template ID
                    {
                        from_name: data.username,
                        from_email: data.email,
                        phone_number: data.phone,
                        message: data.message,
                    }
                );

                if (response.status === 200) {
                    showAlert('Message sent successfully', 'success');
                    form.reset();
                    form.classList.remove('was-validated');
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                showAlert('Error sending message. Please try again.', 'danger');
                console.error('EmailJS Error:', error);
                throw error;
            }
        }

        /**
         * Email Validation
         * Validates email format using regex
         */
        function validateEmail(email) {
            try {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            } catch (error) {
                console.error('Error validating email:', error);
                return false;
            }
        }

        /**
         * Phone Validation
         * Validates phone number (minimum 8 digits)
         */
        function validatePhone(phone) {
            try {
                return /^\d{8,}$/.test(phone.replace(/\D/g, ''));
            } catch (error) {
                console.error('Error validating phone:', error);
                return false;
            }
        }

        /**
         * Set Loading State
         * Updates button UI to show loading state
         */
        function setLoading(isLoading) {
            try {
                submitBtn.style.pointerEvents = isLoading ? 'none' : 'auto';
                if (spinner) spinner.classList.toggle('d-none', !isLoading);
                if (buttonText) buttonText.classList.toggle('d-none', isLoading);
            } catch (error) {
                console.error('Error setting loading state:', error);
            }
        }

        /**
         * Show Alert Message
         * Displays feedback message to user
         */
        function showAlert(message, type) {
            try {
                if (formAlert) {
                    formAlert.textContent = message;
                    formAlert.className = `alert alert-${type} text-center mt-3`;
                    formAlert.classList.remove('d-none');
                }
            } catch (error) {
                console.error('Error showing alert:', error);
            }
        }

        /**
         * Hide Alert Message
         * Hides the alert message
         */
        function hideAlert() {
            try {
                if (formAlert) {
                    formAlert.classList.add('d-none');
                }
            } catch (error) {
                console.error('Error hiding alert:', error);
            }
        }

    } catch (error) {
        console.error('Error initializing contact form:', error);
    }
});
