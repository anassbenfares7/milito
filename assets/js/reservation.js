/**
 * ===================================
 * RESERVATION FORM HANDLER
 * AZITALIA RESTAURANT TEMPLATE
 * ===================================
 */

/**
 * Google Apps Script Configuration
 * Web App URL for reservation data submission to Google Sheets
 */
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxcQn_kv6QziJpoqrV0J08RIMYtbcCKOKkvorUy7gBab87DpKaCf0U9bIuEDZJcK9UJ/exec';

/**
 * Reservation Form Controller
 * Handles restaurant table reservation form submission and validation
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Form elements initialization
        const form = document.getElementById('reservationForm');
        if (!form) {
            console.error('Reservation form not found');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const spinner = submitBtn ? submitBtn.querySelector('.spinner-border') : null;
        const buttonText = submitBtn ? submitBtn.querySelector('.button-text') : null;
        const formAlert = document.getElementById('formAlert');

        // Initialize form settings
        initializeFormSettings();

        // Setup form submission handler
        form.addEventListener('submit', handleReservationSubmission);

        /**
         * Initialize Form Settings
         * Sets up date validation and other form configurations
         */
        function initializeFormSettings() {
            // Set minimum date to today to prevent past reservations
            try {
                const dateInput = document.getElementById('date');
                if (dateInput) {
                    const today = new Date().toISOString().split('T')[0];
                    dateInput.min = today;
                }
            } catch (error) {
                console.error('Error setting minimum date:', error);
            }
        }

        /**
         * Handle Reservation Submission
         * Processes form validation and submission to Google Sheets
         */
        async function handleReservationSubmission(e) {
            try {
                e.preventDefault();

                // Reset validation state
                form.classList.remove('was-validated');
                hideAlert();

                // Perform basic HTML5 validation
                if (!form.checkValidity()) {
                    form.classList.add('was-validated');
                    return;
                }

                // Extract and validate form data
                const formData = getReservationData();
                if (!validateReservationData(formData)) {
                    return;
                }

                // Show loading state
                setLoading(true);

                // Submit reservation
                await submitReservation(formData);

            } catch (error) {
                console.error('Error during form submission:', error);
                showAlert('Une erreur inattendue est survenue. Veuillez réessayer.', 'danger');
            } finally {
                setLoading(false);
            }
        }

        /**
         * Get Reservation Data
         * Extracts form data and adds timestamp
         */
        function getReservationData() {
            const phoneInput = document.getElementById('phone');
            const peopleInput = document.getElementById('people');
            const dateInput = document.getElementById('date');
            const timeInput = document.getElementById('time');

            return {
                phone: phoneInput ? phoneInput.value.trim() : '',
                people: peopleInput ? peopleInput.value : '',
                date: dateInput ? dateInput.value : '',
                time: timeInput ? timeInput.value : '',
                timestamp: new Date().toISOString()
            };
        }

        /**
         * Validate Reservation Data
         * Performs comprehensive validation on reservation data
         */
        function validateReservationData(data) {
            // Phone number validation (minimum 8 digits)
            if (!validatePhone(data.phone)) {
                showAlert('Veuillez entrer un numéro de téléphone valide', 'danger');
                return false;
            }

            // Date validation (cannot be in the past)
            if (!validateDate(data.date)) {
                showAlert('La date ne peut pas être dans le passé', 'danger');
                return false;
            }

            return true;
        }

        /**
         * Submit Reservation
         * Sends reservation data to Google Sheets via Apps Script
         */
        async function submitReservation(data) {
            try {
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'no-cors' // Required for Google Apps Script
                });

                // Show success message (no-cors mode means we can't check response)
                showAlert('Réservation confirmée', 'success');
                form.reset();
                form.classList.remove('was-validated');

            } catch (error) {
                showAlert('Erreur de réservation. Veuillez réessayer.', 'danger');
                console.error('Reservation submission error:', error);
                throw error;
            }
        }

        /**
         * Phone Number Validation
         * Validates phone number format (minimum 8 digits)
         */
        function validatePhone(phone) {
            try {
                // Remove any non-digit characters and validate length
                const cleanPhone = phone.replace(/\D/g, '');
                return /^\d{8,}$/.test(cleanPhone);
            } catch (error) {
                console.error('Error validating phone:', error);
                return false;
            }
        }

        /**
         * Date Validation
         * Ensures reservation date is not in the past
         */
        function validateDate(date) {
            try {
                const selectedDate = new Date(date);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Set to start of day for comparison
                return selectedDate >= today;
            } catch (error) {
                console.error('Error validating date:', error);
                return false;
            }
        }

        /**
         * Set Loading State
         * Updates button UI to show loading state during submission
         */
        function setLoading(isLoading) {
            try {
                if (submitBtn) submitBtn.disabled = isLoading;
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
                    formAlert.className = `alert alert-${type} text-center`;
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
        console.error('Error initializing reservation form:', error);
    }
});
