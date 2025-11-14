/**
 * ===================================
 * CORE WEB VITALS MONITORING
 * AZITALIA RESTAURANT TEMPLATE
 * ===================================
 */

/**
 * Web Vitals Performance Monitor
 * Tracks and reports Core Web Vitals metrics for performance optimization
 * Only runs in production environments to avoid affecting development
 */
class WebVitalsMonitor {
  constructor() {
    // Performance metrics storage
    this.metrics = {
      FCP: null,  // First Contentful Paint - Loading performance
      LCP: null,  // Largest Contentful Paint - Loading performance
      FID: null,  // First Input Delay - Interactivity
      CLS: null,  // Cumulative Layout Shift - Visual stability
      TTFB: null  // Time to First Byte - Server response time
    };

    // Initialize monitoring system
    this.init();
  }

  /**
   * Initialize Performance Monitoring
   * Sets up observers for all Core Web Vitals metrics
   */
  init() {
    // Skip monitoring in development environments
    if (this.isDevelopmentEnvironment()) {
      return;
    }

    this.observeFCP();
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeTTFB();
  }

  /**
   * Check if Running in Development
   * Prevents monitoring during local development
   */
  isDevelopmentEnvironment() {
    return window.location.hostname === 'localhost' ||
           window.location.hostname === '127.0.0.1';
  }

  /**
   * Monitor First Contentful Paint (FCP)
   * Measures when the first piece of content is rendered
   */
  observeFCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        this.metrics.FCP = entries[0].startTime;
        this.logMetric('FCP', this.metrics.FCP);
      }
    });

    observer.observe({ entryTypes: ['paint'] });
  }

  /**
   * Monitor Largest Contentful Paint (LCP)
   * Measures when the largest content element becomes visible
   */
  observeLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        // Use the last entry as it represents the largest contentful paint
        this.metrics.LCP = entries[entries.length - 1].startTime;
        this.logMetric('LCP', this.metrics.LCP);
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  /**
   * Monitor First Input Delay (FID)
   * Measures the time from user's first interaction to response
   */
  observeFID() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        // Calculate the delay between input start and processing start
        this.metrics.FID = entries[0].processingStart - entries[0].startTime;
        this.logMetric('FID', this.metrics.FID);
      }
    });

    observer.observe({ entryTypes: ['first-input'] });
  }

  /**
   * Monitor Cumulative Layout Shift (CLS)
   * Measures unexpected layout movement during page load
   */
  observeCLS() {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Only count layout shifts that weren't caused by user input
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.metrics.CLS = clsValue;
      this.logMetric('CLS', this.metrics.CLS);
    });

    observer.observe({ entryTypes: ['layout-shift'] });
  }

  /**
   * Monitor Time to First Byte (TTFB)
   * Measures server response time and network latency
   */
  observeTTFB() {
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      // Calculate time from request start to response start
      this.metrics.TTFB = navigation.responseStart - navigation.requestStart;
      this.logMetric('TTFB', this.metrics.TTFB);
    }
  }

  /**
   * Performance Thresholds
   * Defines good, needs-improvement, and poor thresholds for each metric
   */
  getPerformanceThresholds() {
    return {
      FCP: { good: 1800, poor: 3000 },      // Measured in milliseconds
      LCP: { good: 2500, poor: 4000 },      // Measured in milliseconds
      FID: { good: 100, poor: 300 },        // Measured in milliseconds
      CLS: { good: 0.1, poor: 0.25 },       // Measured in unitless score
      TTFB: { good: 600, poor: 1400 }       // Measured in milliseconds
    };
  }

  /**
   * Log and Report Metric
   * Evaluates metric performance and reports to analytics
   */
  logMetric(name, value) {
    const thresholds = this.getPerformanceThresholds();
    const threshold = thresholds[name];

    if (!threshold) return;

    // Determine performance rating
    let rating = this.calculateRating(name, value, threshold);

    // Log to console for debugging (production only)
    console.log(`Web Vital - ${name}: ${Math.round(value * 100) / 100} (${rating})`);

    // Send to analytics if available
    this.reportToAnalytics(name, value, rating);
  }

  /**
   * Calculate Performance Rating
   * Determines if metric performance is good, needs-improvement, or poor
   */
  calculateRating(name, value, threshold) {
    if (name === 'CLS') {
      // CLS has special handling due to its cumulative nature
      if (value > threshold.poor) return 'poor';
      if (value > threshold.good) return 'needs-improvement';
      return 'good';
    } else {
      // For time-based metrics (lower is better)
      if (value > threshold.poor) return 'poor';
      if (value > threshold.good) return 'needs-improvement';
      return 'good';
    }
  }

  /**
   * Report to Analytics
   * Sends performance data to Google Analytics or other analytics services
   */
  reportToAnalytics(name, value, rating) {
    // Send to Google Analytics if gtag is available
    if (window.gtag) {
      window.gtag('event', 'web_vital', {
        metric_name: name,
        metric_value: Math.round(value * 100) / 100,
        metric_rating: rating,
        custom_map: {
          custom_parameter_1: name,
          custom_parameter_2: rating
        }
      });
    }

    // Additional analytics integration can be added here
    // Example: Send to custom analytics service
    // this.sendToCustomAnalytics(name, value, rating);
  }

  /**
   * Get All Metrics Summary
   * Returns a summary of all collected metrics
   */
  getMetricsSummary() {
    return {
      ...this.metrics,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
  }
}

/**
 * Initialize Web Vitals Monitor
 * Creates new monitor instance when DOM is ready
 */
function initializeWebVitalsMonitor() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new WebVitalsMonitor());
  } else {
    new WebVitalsMonitor();
  }
}

// Start monitoring
initializeWebVitalsMonitor();