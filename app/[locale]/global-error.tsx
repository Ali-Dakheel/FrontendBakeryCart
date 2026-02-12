"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

/**
 * Global Error Boundary
 * Catches errors in the root layout
 * Must include its own <html> and <body> tags
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global application error:", error);

    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    // Example: Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FEF7ED',
          padding: '1rem',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '32rem',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            border: '2px solid #EF4444'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <AlertTriangle
                style={{ width: '2rem', height: '2rem', color: '#EF4444' }}
              />
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1F2937',
                margin: 0
              }}>
                Critical Application Error
              </h1>
            </div>

            {/* Message */}
            <p style={{
              color: '#6B7280',
              marginBottom: '1.5rem',
              lineHeight: '1.5'
            }}>
              We encountered a critical error that prevented the application from loading.
              Please try restarting the application. If the problem persists, contact support.
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && error.message && (
              <details style={{
                backgroundColor: '#F3F4F6',
                padding: '1rem',
                borderRadius: '0.375rem',
                marginBottom: '1.5rem',
                fontSize: '0.875rem'
              }}>
                <summary style={{
                  cursor: 'pointer',
                  fontWeight: '500',
                  marginBottom: '0.5rem'
                }}>
                  Technical Details
                </summary>
                <pre style={{
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  margin: 0
                }}>
                  {error.message}
                </pre>
                {error.digest && (
                  <p style={{ marginTop: '0.5rem', color: '#6B7280' }}>
                    Error ID: {error.digest}
                  </p>
                )}
              </details>
            )}

            {/* Actions */}
            <button
              onClick={reset}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#1E3A5F',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#2C5282';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#1E3A5F';
              }}
            >
              <RefreshCw style={{ width: '1.25rem', height: '1.25rem' }} />
              Restart Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
