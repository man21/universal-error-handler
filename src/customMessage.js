const ErrorCode = [
    { error: 'UNAUTHORIZED', message: 'You are not authorized to access this resource.', category: 'Authentication', statusCode: 401 },
    { error: 'CONFLICT', message: 'Already exists.', category: 'General', statusCode: 409 },
    { error: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred on the server.', category: 'Server', statusCode: 500 },
    { error: 'FORBIDDEN', message: 'You do not have permission to access this resource.', category: 'Authorization', statusCode: 403 },
    { error: 'NOT_FOUND', message: 'The requested resource could not be found.', category: 'General', statusCode: 404 },
    { error: 'METHOD_NOT_ALLOWED', message: 'The HTTP method used is not allowed for this endpoint.', category: 'General', statusCode: 405 },
    { error: 'UNSUPPORTED_MEDIA_TYPE', message: 'The media type of the request is not supported.', category: 'General', statusCode: 415 },
  
    { error: 'INVALID_INPUT', message: 'The input provided is invalid.', category: 'Validation', statusCode: 400 },
    { error: 'MISSING_FIELDS', message: 'Required fields are missing from the request.', category: 'Validation', statusCode: 400 },
    { error: 'EMAIL_ALREADY_EXISTS', message: 'An account with this email already exists.', category: 'Validation', statusCode: 409 },
    { error: 'USER_NOT_FOUND', message: 'No user found with the provided details.', category: 'Validation', statusCode: 404 },
    { error: 'PASSWORD_TOO_WEAK', message: 'The provided password is too weak.', category: 'Validation', statusCode: 400 },
    { error: 'INVALID_FORMAT', message: 'The format of the input is invalid.', category: 'Validation', statusCode: 400 },
  
    { error: 'INVALID_CREDENTIALS', message: 'The provided credentials are incorrect.', category: 'Authentication', statusCode: 401 },
    { error: 'TOKEN_EXPIRED', message: 'The authentication token has expired.', category: 'Authentication', statusCode: 401 },
    { error: 'INVALID_TOKEN', message: 'The authentication token is invalid.', category: 'Authentication', statusCode: 401 },
    { error: 'EMAIL_VERIFICATION_REQUIRED', message: 'Email verification is required to proceed.', category: 'Authentication', statusCode: 403 },
    { error: 'ACCOUNT_LOCKED', message: 'The account has been locked due to multiple failed login attempts.', category: 'Authentication', statusCode: 423 },
  
    // Database Errors
    { error: 'DATABASE_ERROR', message: 'An error occurred while accessing the database.', category: 'Database', statusCode: 500 },
    { error: 'DUPLICATE_ENTRY', message: 'A record with the same key already exists in the database.', category: 'Database', statusCode: 409 },
    { error: 'DATA_NOT_FOUND', message: 'The requested data could not be found in the database.', category: 'Database', statusCode: 404 },
    { error: 'TRANSACTION_FAILED', message: 'The database transaction failed.', category: 'Database', statusCode: 500 },
  
    // External Service Errors
    { error: 'SERVICE_UNAVAILABLE', message: 'The external service is currently unavailable.', category: 'External Service', statusCode: 503 },
    { error: 'API_ERROR', message: 'An error occurred while communicating with an external API.', category: 'External Service', statusCode: 502 },
    { error: 'THROTTLING_ERROR', message: 'Too many requests have been made in a short period of time.', category: 'External Service', statusCode: 429 },
  
    // Authorization Errors
    { error: 'INSUFFICIENT_PERMISSIONS', message: 'You do not have sufficient permissions to perform this action.', category: 'Authorization', statusCode: 403 },
    { error: 'ROLE_NOT_FOUND', message: 'The specified role could not be found.', category: 'Authorization', statusCode: 404 },
    { error: 'ACCESS_DENIED', message: 'Access to this resource is denied.', category: 'Authorization', statusCode: 403 },
  
    // Security Errors
    { error: 'CSRF_TOKEN_MISSING', message: 'CSRF token is missing from the request.', category: 'Security', statusCode: 400 },
    { error: 'CSRF_TOKEN_INVALID', message: 'CSRF token is invalid.', category: 'Security', statusCode: 400 },
    { error: 'SECURITY_VIOLATION', message: 'A security violation was detected.', category: 'Security', statusCode: 403 },
  
    // File and Media Errors
    { error: 'FILE_TOO_LARGE', message: 'The uploaded file is too large.', category: 'File and Media', statusCode: 413 },
    { error: 'FILE_FORMAT_NOT_SUPPORTED', message: 'The format of the uploaded file is not supported.', category: 'File and Media', statusCode: 415 },
    { error: 'FILE_UPLOAD_FAILED', message: 'The file upload failed.', category: 'File and Media', statusCode: 500 },
  
    // Custom Business Logic Errors
    { error: 'BUSINESS_LOGIC_ERROR', message: 'A business logic error occurred.', category: 'Business Logic', statusCode: 400 },
    { error: 'PAYMENT_FAILED', message: 'The payment process failed.', category: 'Business Logic', statusCode: 402 },
    { error: 'ORDER_NOT_FOUND', message: 'The requested order could not be found.', category: 'Business Logic', statusCode: 404 },
    { error: 'INVENTORY_ERROR', message: 'An error occurred while checking inventory.', category: 'Business Logic', statusCode: 500 },
  
    // Deprecated Errors
    { error: 'DEPRECATED_API', message: 'The requested API endpoint is deprecated.', category: 'Deprecated', statusCode: 410 },
    { error: 'FEATURE_NOT_IMPLEMENTED', message: 'The requested feature is not implemented yet.', category: 'Deprecated', statusCode: 501 },
  
    // Additional errors
    { error: 'BAD_REQUEST', message: 'The request is malformed or contains invalid data.', category: 'Client Error', statusCode: 400 },
    { error: 'NOT_ACCEPTABLE', message: 'The server cannot generate a response that is acceptable according to the Accept header.', category: 'Client Error', statusCode: 406 },
    { error: 'GATEWAY_TIMEOUT', message: 'The server did not receive a timely response from an upstream server.', category: 'Server Error', statusCode: 504 },
    { error: 'SERVICE_UNAVAILABLE', message: 'The service is temporarily unavailable. Please try again later.', category: 'Server Error', statusCode: 503 },
    { error: 'PRECONDITION_FAILED', message: 'The precondition given in one or more of the request headers evaluated to false when tested on the server.', category: 'Client Error', statusCode: 412 },
    { error: 'UNPROCESSABLE_ENTITY', message: 'The request was well-formed but unable to be followed due to semantic errors.', category: 'Client Error', statusCode: 422 },
    { error: 'LOCKED', message: 'The resource that is being accessed is locked.', category: 'Client Error', statusCode: 423 },
    { error: 'FAILED_DEPENDENCY', message: 'The request failed due to failure of a previous request.', category: 'Server Error', statusCode: 424 },
    { error: 'PAYMENT_REQUIRED', message: 'Payment is required to access this resource.', category: 'Client Error', statusCode: 402 },
  
    // Rate Limiting Errors
    { error: 'TOO_MANY_REQUESTS', message: 'You have made too many requests in a given time period. Please try again later.', category: 'Client Error', statusCode: 429 },
  
    // Authentication Errors
    { error: 'AUTHENTICATION_REQUIRED', message: 'Authentication is required to access this resource.', category: 'Authentication', statusCode: 401 },
    { error: 'INVALID_API_KEY', message: 'The provided API key is invalid.', category: 'Authentication', statusCode: 401 },
  
    // CORS Errors
    { error: 'CORS_ERROR', message: 'Cross-origin resource sharing (CORS) is not allowed for this request.', category: 'Client Error', statusCode: 403 },
  
    // Client-Side Errors
    { error: 'CLIENT_ERROR', message: 'A client-side error occurred. Please check your request and try again.', category: 'Client Error', statusCode: 400 },
  
    // Configuration Errors
    { error: 'CONFIGURATION_ERROR', message: 'There was an issue with the system configuration.', category: 'Server Error', statusCode: 500 },
  
    // Data Processing Errors
    { error: 'DATA_PROCESSING_ERROR', message: 'An error occurred while processing the data.', category: 'Server Error', statusCode: 500 },
  
    // Payment/Transaction Errors
    { error: 'INSUFFICIENT_FUNDS', message: 'Insufficient funds to complete the transaction.', category: 'Payment Error', statusCode: 402 },
    { error: 'PAYMENT_GATEWAY_ERROR', message: 'An error occurred while processing the payment.', category: 'Payment Error', statusCode: 500 },
    { error: 'CANCELLED_PAYMENT', message: 'The payment has been cancelled.', category: 'Payment Error', statusCode: 400 },
  
    // Social/Third-Party Integration Errors
    { error: 'THIRD_PARTY_ERROR', message: 'An error occurred with a third-party service integration.', category: 'External Service Error', statusCode: 503 },
  
    // Temporary Errors
    { error: 'TEMPORARY_UNAVAILABLE', message: 'The service is temporarily unavailable. Please try again later.', category: 'Service Error', statusCode: 503 },
  
    // User Errors
    { error: 'USER_ALREADY_EXISTS', message: 'The user already exists with the provided details.', category: 'User Error', statusCode: 409 },
  
    // Custom Application Errors
    { error: 'APPLICATION_ERROR', message: 'An unexpected error occurred in the application.', category: 'Server Error', statusCode: 500 },
  
    // Debugging Errors
    { error: 'DEBUGGING_ERROR', message: 'A debugging issue occurred, please check the logs for more details.', category: 'Server Error', statusCode: 500 },
  
    // Maintenance Errors
    { error: 'MAINTENANCE_MODE', message: 'The service is currently in maintenance mode. Please try again later.', category: 'Service Error', statusCode: 503 },
  
    // Network Errors
    { error: 'NETWORK_ERROR', message: 'A network error occurred. Please check your connection and try again.', category: 'Client Error', statusCode: 408 },
    { error: 'TIMEOUT_ERROR', message: 'The request timed out. Please try again later.', category: 'Client Error', statusCode: 408 },
  
    // Input Validation Errors
    { error: 'INVALID_DATE', message: 'The provided date is invalid.', category: 'Input Validation Error', statusCode: 400 },
    { error: 'INVALID_PHONE_NUMBER', message: 'The provided phone number is invalid.', category: 'Input Validation Error', statusCode: 400 },
    { error: 'INVALID_URL', message: 'The provided URL is not valid.', category: 'Input Validation Error', statusCode: 400 },
  
    // File Upload Errors
    { error: 'FILE_TOO_LARGE', message: 'The uploaded file is too large. Please upload a smaller file.', category: 'File Error', statusCode: 413 },
    { error: 'FILE_UPLOAD_FAILED', message: 'The file upload failed due to an internal error.', category: 'File Error', statusCode: 500 },
    { error: 'FILE_EXTENSION_NOT_ALLOWED', message: 'The file extension is not allowed. Please upload a valid file.', category: 'File Error', statusCode: 415 },
  
    // Authorization and Access Control Errors
    { error: 'ACCESS_RESTRICTED', message: 'You do not have permission to access this resource.', category: 'Authorization Error', statusCode: 403 },
    { error: 'SESSION_EXPIRED', message: 'Your session has expired. Please log in again.', category: 'Authorization Error', statusCode: 401 },
    { error: 'TOKEN_INVALID', message: 'The provided token is invalid or has been tampered with.', category: 'Authorization Error', statusCode: 401 },
  
    // Subscription/Plan Errors
    { error: 'SUBSCRIPTION_EXPIRED', message: 'Your subscription has expired. Please renew your plan.', category: 'Subscription Error', statusCode: 402 },
    { error: 'SUBSCRIPTION_NOT_FOUND', message: 'The subscription plan could not be found.', category: 'Subscription Error', statusCode: 404 },
  
    // Data Integrity Errors
    { error: 'DATA_INTEGRITY_ERROR', message: 'The data integrity check has failed.', category: 'Data Error', statusCode: 500 },
    { error: 'CONFLICT_DETECTED', message: 'A conflict was detected while processing the request.', category: 'Data Error', statusCode: 409 },
  
    // Feature/Functionality Errors
    { error: 'FEATURE_UNAVAILABLE', message: 'This feature is currently unavailable.', category: 'Feature Error', statusCode: 503 },
    { error: 'FUNCTION_NOT_IMPLEMENTED', message: 'The requested function is not implemented yet.', category: 'Feature Error', statusCode: 501 },
  
    // Request Validation Errors
    { error: 'MALFORMED_REQUEST', message: 'The request is malformed and cannot be processed.', category: 'Request Error', statusCode: 400 },
    { error: 'MISSING_PARAMETER', message: 'A required parameter is missing from the request.', category: 'Request Error', statusCode: 400 },
  
    // Rate-Limiting Errors
    { error: 'RATE_LIMIT_EXCEEDED', message: 'You have exceeded the rate limit for this request.', category: 'Rate-Limiting Error', statusCode: 429 },
  
    // Payment Processing Errors
    { error: 'PAYMENT_METHOD_NOT_SUPPORTED', message: 'The selected payment method is not supported.', category: 'Payment Error', statusCode: 402 },
    { error: 'INSUFFICIENT_BALANCE', message: 'Your account has insufficient balance to complete the payment.', category: 'Payment Error', statusCode: 402 },
  
    // Internal Server Errors
    { error: 'SERVICE_UNAVAILABLE', message: 'The service is temporarily unavailable. Please try again later.', category: 'Internal Server Error', statusCode: 503 },
    { error: 'UNEXPECTED_SERVER_ERROR', message: 'An unexpected error occurred on the server. Please try again later.', category: 'Internal Server Error', statusCode: 500 },
  
    // Resource Errors
    { error: 'RESOURCE_NOT_FOUND', message: 'The requested resource could not be found.', category: 'Resource Error', statusCode: 404 },
    { error: 'RESOURCE_LOCKED', message: 'The resource is currently locked. Please try again later.', category: 'Resource Error', statusCode: 423 },
  
    // User Registration Errors
    { error: 'USER_ALREADY_REGISTERED', message: 'The user is already registered with the system.', category: 'User Error', statusCode: 409 },
  
    // Payment Processing Errors
    { error: 'TRANSACTION_DECLINED', message: 'The transaction was declined. Please check your payment details.', category: 'Payment Error', statusCode: 402 },
  
    // Authorization and Authentication Errors
    { error: 'ACCESS_DENIED', message: 'You do not have permission to access this resource.', category: 'Authorization Error', statusCode: 403 },
    { error: 'INVALID_CREDENTIALS', message: 'The provided credentials are incorrect.', category: 'Authentication Error', statusCode: 401 },
  
    // External API Errors
    { error: 'EXTERNAL_API_ERROR', message: 'An error occurred while communicating with an external API.', category: 'External API Error', statusCode: 502 },
    { error: 'EXTERNAL_API_TIMEOUT', message: 'The external API request timed out. Please try again later.', category: 'External API Error', statusCode: 504 },
  
    // Validation Errors
    { error: 'INVALID_EMAIL_FORMAT', message: 'The email address format is invalid.', category: 'Validation Error', statusCode: 400 },
    { error: 'PASSWORD_TOO_SHORT', message: 'The password is too short. It must be at least 8 characters long.', category: 'Validation Error', statusCode: 400 },
    { error: 'PASSWORD_MISSING', message: 'A password is required to proceed.', category: 'Validation Error', statusCode: 400 },
  
    // Business Logic Errors
    { error: 'BUSINESS_LOGIC_VIOLATION', message: 'A violation of the business logic occurred.', category: 'Business Logic Error', statusCode: 422 },
  
    // Security Errors
    { error: 'SECURITY_VIOLATION', message: 'A security violation has occurred. Please contact support.', category: 'Security Error', statusCode: 403 },
    { error: 'SSL_CERTIFICATE_INVALID', message: 'The SSL certificate is invalid or has expired.', category: 'Security Error', statusCode: 495 },
    { error: 'INSECURE_CONNECTION', message: 'The connection is not secure.', category: 'Security Error', statusCode: 400 },
  
    // Request Timeout Errors
    { error: 'REQUEST_TIMEOUT', message: 'The request took too long to process and timed out.', category: 'Timeout Error', statusCode: 408 },
    { error: 'SERVER_TIMEOUT', message: 'The server timed out while processing your request.', category: 'Timeout Error', statusCode: 504 },
  
    // Redirection Errors
    { error: 'REDIRECT_ERROR', message: 'The request encountered an unexpected redirection error.', category: 'Redirection Error', statusCode: 302 },
  
    // Deprecated API Errors
    { error: 'API_DEPRECATED', message: 'The API endpoint is deprecated and may be removed in future versions.', category: 'Deprecated API Error', statusCode: 410 },
  
    // Validation Errors
    { error: 'INVALID_FORMAT', message: 'The input format is invalid.', category: 'Validation Error', statusCode: 400 },
  
    // Database Errors
    { error: 'DATABASE_CONNECTION_ERROR', message: 'Failed to connect to the database.', category: 'Database Error', statusCode: 500 },
    { error: 'DATABASE_TIMEOUT', message: 'The database request timed out.', category: 'Database Error', statusCode: 504 },
    { error: 'QUERY_SYNTAX_ERROR', message: 'There is a syntax error in the database query.', category: 'Database Error', statusCode: 400 },
  
    // Encryption Errors
    { error: 'ENCRYPTION_FAILED', message: 'The encryption operation failed.', category: 'Encryption Error', statusCode: 500 },
    { error: 'DECRYPTION_FAILED', message: 'The decryption operation failed.', category: 'Encryption Error', statusCode: 500 },
  
    // Dependency Errors
    { error: 'DEPENDENCY_MISSING', message: 'A required dependency is missing.', category: 'Dependency Error', statusCode: 400 },
    { error: 'DEPENDENCY_VERSION_MISMATCH', message: 'The required version of a dependency is not available.', category: 'Dependency Error', statusCode: 400 },
  
    // Input Errors
    { error: 'INVALID_INPUT', message: 'The input provided is invalid.', category: 'Input Error', statusCode: 400 },
    { error: 'MISSING_FIELDS', message: 'Required fields are missing in the input.', category: 'Input Error', statusCode: 400 },
  
    // Timeout Errors
    { error: 'OPERATION_TIMEOUT', message: 'The operation timed out. Please try again.', category: 'Timeout Error', statusCode: 408 },
  
    // External Service Errors
    { error: 'EXTERNAL_SERVICE_UNAVAILABLE', message: 'The external service is currently unavailable.', category: 'External Service Error', statusCode: 503 },
    { error: 'EXTERNAL_SERVICE_ERROR', message: 'An error occurred while interacting with an external service.', category: 'External Service Error', statusCode: 502 },
  
    // File System Errors
    { error: 'FILE_NOT_FOUND', message: 'The requested file could not be found.', category: 'File System Error', statusCode: 404 },
    { error: 'FILE_PERMISSION_DENIED', message: 'Permission to access the file was denied.', category: 'File System Error', statusCode: 403 },
  
    // License Errors
    { error: 'LICENSE_EXPIRED', message: 'Your license has expired. Please renew it.', category: 'License Error', statusCode: 403 },
    { error: 'INVALID_LICENSE_KEY', message: 'The provided license key is invalid.', category: 'License Error', statusCode: 400 },
  
    // API Request Errors
    { error: 'API_METHOD_NOT_SUPPORTED', message: 'The requested API method is not supported.', category: 'API Error', statusCode: 405 },
    { error: 'API_ENDPOINT_NOT_FOUND', message: 'The requested API endpoint could not be found.', category: 'API Error', statusCode: 404 },
  
    // Rate Limit Errors
    { error: 'RATE_LIMIT_EXCEEDED', message: 'Rate limit exceeded. Please try again later.', category: 'Rate Limit Error', statusCode: 429 },
  
    // Configuration and Setup Errors
    { error: 'SETUP_ERROR', message: 'There was an error during setup.', category: 'Configuration Error', statusCode: 500 },
    { error: 'CONFIGURATION_MISSING', message: 'Configuration data is missing.', category: 'Configuration Error', statusCode: 400 },
  
    // Application Feature Errors
    { error: 'FEATURE_NOT_ENABLED', message: 'The requested feature is not enabled.', category: 'Feature Error', statusCode: 403 },
  
    // User Profile Errors
    { error: 'USER_PROFILE_NOT_FOUND', message: 'The user profile could not be found.', category: 'User Profile Error', statusCode: 404 },
    { error: 'USER_PROFILE_UPDATE_FAILED', message: 'An error occurred while updating the user profile.', category: 'User Profile Error', statusCode: 500 },
  
    // API Token Errors
    { error: 'API_TOKEN_EXPIRED', message: 'The API token has expired. Please request a new one.', category: 'API Token Error', statusCode: 401 },
    { error: 'API_TOKEN_REVOKED', message: 'The API token has been revoked.', category: 'API Token Error', statusCode: 401 },
  
    // System Resource Errors
    { error: 'INSUFFICIENT_MEMORY', message: 'There is insufficient memory to complete this operation.', category: 'System Resource Error', statusCode: 500 },
    { error: 'RESOURCE_LIMIT_REACHED', message: 'The system resource limit has been reached.', category: 'System Resource Error', statusCode: 503 },
  
    // SSL/TLS Errors
    { error: 'SSL_HANDSHAKE_FAILED', message: 'The SSL handshake failed.', category: 'SSL/TLS Error', statusCode: 400 },
    { error: 'SSL_CERTIFICATE_EXPIRED', message: 'The SSL certificate has expired.', category: 'SSL/TLS Error', statusCode: 403 },
  
    // Backup Errors
    { error: 'BACKUP_FAILED', message: 'The backup operation failed.', category: 'Backup Error', statusCode: 500 },
    { error: 'BACKUP_NOT_FOUND', message: 'The requested backup could not be found.', category: 'Backup Error', statusCode: 404 },
  
    // Service Unavailability Errors
    { error: 'SERVICE_UNAVAILABLE_TEMP', message: 'The service is temporarily unavailable. Please try again later.', category: 'Service Error', statusCode: 503 },
    { error: 'SERVICE_UNAVAILABLE_PERM', message: 'The service is permanently unavailable.', category: 'Service Error', statusCode: 410 },
  
    // Security Errors
    { error: 'UNAUTHORIZED_ACCESS', message: 'You do not have authorization to access this resource.', category: 'Security Error', statusCode: 403 },
    { error: 'SECURITY_TOKEN_EXPIRED', message: 'The security token has expired.', category: 'Security Error', statusCode: 401 },
  
    // Resource Allocation Errors
    { error: 'INSUFFICIENT_RESOURCES', message: 'There are not enough resources to complete the operation.', category: 'Resource Allocation Error', statusCode: 500 },
  
    // Permission Errors
    { error: 'PERMISSION_DENIED', message: 'You do not have permission to perform this operation.', category: 'Permission Error', statusCode: 403 },
    { error: 'INTERNAL_PERMISSION_ERROR', message: 'An internal permission error occurred.', category: 'Permission Error', statusCode: 500 },
  
    // Versioning Errors
    { error: 'VERSION_MISMATCH', message: 'The version of the resource is incompatible.', category: 'Versioning Error', statusCode: 400 },
  
    // User Action Errors
    { error: 'USER_ACTION_REQUIRED', message: 'This operation requires user action.', category: 'User Action Error', statusCode: 400 },
  
    // Email Errors
    { error: 'EMAIL_SEND_FAILED', message: 'There was an error sending the email.', category: 'Email Error', statusCode: 500 },
    { error: 'INVALID_EMAIL_ADDRESS', message: 'The email address provided is invalid.', category: 'Email Error', statusCode: 400 },
  
    // Document Processing Errors
    { error: 'DOCUMENT_UPLOAD_FAILED', message: 'Document upload failed due to an error.', category: 'Document Error', statusCode: 500 },
    { error: 'DOCUMENT_NOT_FOUND', message: 'The requested document could not be found.', category: 'Document Error', statusCode: 404 },
  
    // Admin Errors
    { error: 'ADMIN_PRIVILEGES_REQUIRED', message: 'Administrator privileges are required to perform this operation.', category: 'Admin Error', statusCode: 403 },
  
    // Logging Errors
    { error: 'LOGGING_FAILED', message: 'An error occurred while writing to the logs.', category: 'Logging Error', statusCode: 500 },
  
    // Authentication and Token Errors
    { error: 'INVALID_AUTH_TOKEN', message: 'The authentication token is invalid.', category: 'Authentication Error', statusCode: 401 },
    { error: 'AUTHENTICATION_TIMEOUT', message: 'The authentication process timed out.', category: 'Authentication Error', statusCode: 408 },
  
    // Upgrade Errors
    { error: 'UPGRADE_FAILED', message: 'The upgrade process failed.', category: 'Upgrade Error', statusCode: 500 },
    { error: 'UPGRADE_REQUIRED', message: 'An upgrade is required to access this feature.', category: 'Upgrade Error', statusCode: 426 },
  
    // Database Migration Errors
    { error: 'MIGRATION_FAILED', message: 'The database migration failed.', category: 'Database Migration Error', statusCode: 500 },
    { error: 'MIGRATION_PENDING', message: 'Database migration is pending and cannot be completed.', category: 'Database Migration Error', statusCode: 409 },
  
    // Network Errors
    { error: 'NETWORK_UNAVAILABLE', message: 'Network is unavailable. Please check your internet connection.', category: 'Network Error', statusCode: 503 },
    { error: 'NETWORK_TIMEOUT', message: 'The network request timed out.', category: 'Network Error', statusCode: 408 },
  
    // Payment Errors
    { error: 'PAYMENT_METHOD_NOT_SUPPORTED', message: 'The selected payment method is not supported.', category: 'Payment Error', statusCode: 400 },
    { error: 'PAYMENT_GATEWAY_ERROR', message: 'There was an error processing the payment through the gateway.', category: 'Payment Error', statusCode: 502 },
    { error: 'PAYMENT_DECLINED', message: 'The payment was declined by the payment provider.', category: 'Payment Error', statusCode: 402 },
    { error: 'PAYMENT_INSUFFICIENT_FUNDS', message: 'The payment could not be processed due to insufficient funds.', category: 'Payment Error', statusCode: 402 },
    { error: 'PAYMENT_NOT_FOUND', message: 'The payment record could not be found.', category: 'Payment Error', statusCode: 404 },
  
    // Subscription Errors
    { error: 'SUBSCRIPTION_EXPIRED', message: 'Your subscription has expired. Please renew to continue.', category: 'Subscription Error', statusCode: 403 },
    { error: 'SUBSCRIPTION_NOT_FOUND', message: 'The requested subscription could not be found.', category: 'Subscription Error', statusCode: 404 },
    { error: 'SUBSCRIPTION_LIMIT_REACHED', message: 'You have reached the maximum number of subscriptions allowed.', category: 'Subscription Error', statusCode: 429 },
  
    // Authentication & Authorization Errors
    { error: 'AUTHENTICATION_REQUIRED', message: 'Authentication is required to access this resource.', category: 'Authentication Error', statusCode: 401 },
    { error: 'INVALID_REFRESH_TOKEN', message: 'The provided refresh token is invalid.', category: 'Authentication Error', statusCode: 401 },
    { error: 'SESSION_EXPIRED', message: 'Your session has expired. Please log in again.', category: 'Authentication Error', statusCode: 440 },
    { error: 'SESSION_INVALID', message: 'The session is invalid.', category: 'Authentication Error', statusCode: 401 },
    // Server Resource Errors
    { error: 'SERVER_BUSY', message: 'The server is currently busy. Please try again later.', category: 'Server Error', statusCode: 503 },
    { error: 'SERVER_UNAVAILABLE', message: 'The server is currently unavailable. Please try again later.', category: 'Server Error', statusCode: 503 },
  
    // DNS Errors
    { error: 'DNS_RESOLUTION_FAILED', message: 'DNS resolution failed for the requested domain.', category: 'Network Error', statusCode: 502 },
    { error: 'DNS_TIMEOUT', message: 'The DNS request timed out.', category: 'Network Error', statusCode: 504 },
  
    // Configuration Errors
    { error: 'INVALID_CONFIG', message: 'The system configuration is invalid or corrupted.', category: 'Configuration Error', statusCode: 500 },
    { error: 'CONFIG_UPDATE_FAILED', message: 'Failed to update the system configuration.', category: 'Configuration Error', statusCode: 500 },
  
    // Security Violations
    { error: 'ACCESS_TOKEN_EXPIRED', message: 'The access token has expired and is no longer valid.', category: 'Security Error', statusCode: 401 },
    { error: 'ACCESS_TOKEN_INVALID', message: 'The provided access token is invalid or malformed.', category: 'Security Error', statusCode: 401 },
    { error: 'CORS_POLICY_VIOLATION', message: 'Cross-Origin Resource Sharing (CORS) policy violation.', category: 'Security Error', statusCode: 403 },
  
    // Rate-Limiting Errors
    { error: 'TOO_MANY_REQUESTS', message: 'Too many requests have been made in a short period of time. Please try again later.', category: 'Rate Limit Error', statusCode: 429 },
    { error: 'API_RATE_LIMIT_REACHED', message: 'API rate limit has been reached. Please wait and try again.', category: 'Rate Limit Error', statusCode: 429 },
  
    // Proxy Errors
    { error: 'PROXY_ERROR', message: 'An error occurred while routing through the proxy server.', category: 'Proxy Error', statusCode: 502 },
    { error: 'PROXY_TIMEOUT', message: 'The request to the proxy server timed out.', category: 'Proxy Error', statusCode: 504 },
  
    // Resource Not Found Errors
    { error: 'RESOURCE_UNAVAILABLE', message: 'The requested resource is unavailable at the moment.', category: 'Resource Error', statusCode: 404 },
    { error: 'RESOURCE_DELETED', message: 'The requested resource has been deleted.', category: 'Resource Error', statusCode: 410 },
  
    // File Handling Errors
    { error: 'FILE_READ_ERROR', message: 'An error occurred while reading the file.', category: 'File Error', statusCode: 500 },
    { error: 'FILE_WRITE_ERROR', message: 'An error occurred while writing to the file.', category: 'File Error', statusCode: 500 },
    { error: 'FILE_DELETE_FAILED', message: 'Failed to delete the specified file.', category: 'File Error', statusCode: 500 },
  
    // Cache Errors
    { error: 'CACHE_MISS', message: 'The requested data was not found in the cache.', category: 'Cache Error', statusCode: 404 },
    { error: 'CACHE_ERROR', message: 'An error occurred while interacting with the cache.', category: 'Cache Error', statusCode: 500 },
  
    // Database Lock Errors
    { error: 'DATABASE_LOCK_FAILED', message: 'The database lock could not be acquired.', category: 'Database Error', statusCode: 500 },
    { error: 'DATABASE_DEADLOCK', message: 'A deadlock was detected in the database operation.', category: 'Database Error', statusCode: 500 },
  
    // User Action Errors
    { error: 'USER_ACTION_TIMEOUT', message: 'User action timed out. Please try again.', category: 'User Action Error', statusCode: 408 },
    { error: 'USER_ACTION_FAILED', message: 'User action failed. Please try again later.', category: 'User Action Error', statusCode: 500 },
  
    // Application State Errors
    { error: 'APPLICATION_IN_MAINTENANCE', message: 'The application is currently under maintenance.', category: 'Application Error', statusCode: 503 },
    { error: 'APPLICATION_UPGRADE_REQUIRED', message: 'The application version is outdated. An upgrade is required.', category: 'Application Error', statusCode: 426 },
  
    // OAuth Errors
    { error: 'OAUTH_ERROR', message: 'An error occurred during OAuth authentication.', category: 'OAuth Error', statusCode: 401 },
    { error: 'OAUTH_ACCESS_DENIED', message: 'OAuth access was denied.', category: 'OAuth Error', statusCode: 403 },
  
    // Server Configuration Errors
    { error: 'SERVER_CONFIG_MISSING', message: 'Required server configuration is missing.', category: 'Server Configuration Error', statusCode: 500 },
    { error: 'SERVER_CONFIG_INVALID', message: 'The server configuration is invalid.', category: 'Server Configuration Error', statusCode: 500 },
  
    // Language and Localization Errors
    { error: 'INVALID_LANGUAGE', message: 'The requested language is not supported.', category: 'Localization Error', statusCode: 400 },
    { error: 'TRANSLATION_FAILED', message: 'Failed to translate the requested content.', category: 'Localization Error', statusCode: 500 },
  
    // Monitoring and Logging Errors
    { error: 'MONITORING_ERROR', message: 'An error occurred while monitoring the system.', category: 'Monitoring Error', statusCode: 500 },
    { error: 'LOGGING_ERROR', message: 'An error occurred while logging the request.', category: 'Logging Error', statusCode: 500 },
  
    // API Versioning Errors
    { error: 'API_VERSION_NOT_SUPPORTED', message: 'The API version is not supported.', category: 'API Version Error', statusCode: 400 },
    { error: 'API_VERSION_DEPRECATED', message: 'The requested API version is deprecated.', category: 'API Version Error', statusCode: 410 },
  
    // User Account Errors
    { error: 'USER_ALREADY_EXISTS', message: 'A user with this username already exists.', category: 'User Account Error', statusCode: 409 },
    { error: 'USER_ACCOUNT_LOCKED', message: 'The user account is locked due to multiple failed attempts.', category: 'User Account Error', statusCode: 423 },
  
    // Network Connectivity Errors
    { error: 'NETWORK_CONNECTED', message: 'The network is connected.', category: 'Network Connectivity', statusCode: 200 },
    { error: 'NETWORK_DISCONNECTED', message: 'The network is disconnected.', category: 'Network Connectivity', statusCode: 503 },
    { error: 'NETWORK_CONNECTION_TIMEOUT', message: 'The network connection timed out.', category: 'Network Connectivity', statusCode: 408 },
  
  
    // Authentication Errors
    { code: 'AUTHENTICATION_REQUIRED', message: 'Authentication is required to access this resource.', category: 'Authentication', statusCode: 401 },
    { code: 'INVALID_REFRESH_TOKEN', message: 'The provided refresh token is invalid.', category: 'Authentication', statusCode: 400 },
    { code: 'SESSION_EXPIRED', message: 'Your session has expired. Please log in again.', category: 'Authentication', statusCode: 440 },
    { code: 'SESSION_INVALID', message: 'The session is invalid.', category: 'Authentication', statusCode: 440 },
  
    // Payment Errors
    { code: 'PAYMENT_METHOD_NOT_SUPPORTED', message: 'The selected payment method is not supported.', category: 'Payment', statusCode: 400 },
    { code: 'PAYMENT_GATEWAY_ERROR', message: 'There was an error processing the payment through the gateway.', category: 'Payment', statusCode: 502 },
    { code: 'PAYMENT_DECLINED', message: 'The payment was declined by the payment provider.', category: 'Payment', statusCode: 402 },
    { code: 'PAYMENT_INSUFFICIENT_FUNDS', message: 'The payment could not be processed due to insufficient funds.', category: 'Payment', statusCode: 402 },
    { code: 'PAYMENT_NOT_FOUND', message: 'The payment record could not be found.', category: 'Payment', statusCode: 404 },
  
    // Network Errors
    { code: 'NETWORK_UNAVAILABLE', message: 'Network is unavailable. Please check your internet connection.', category: 'Network', statusCode: 503 },
    { code: 'NETWORK_TIMEOUT', message: 'The network request timed out.', category: 'Network', statusCode: 504 },
    { code: 'NETWORK_CONNECTION_TIMEOUT', message: 'The network connection timed out.', category: 'Network', statusCode: 504 },
  
    // Resource Errors
    { code: 'RESOURCE_UNAVAILABLE', message: 'The requested resource is unavailable at the moment.', category: 'Resource', statusCode: 503 },
    { code: 'RESOURCE_DELETED', message: 'The requested resource has been deleted.', category: 'Resource', statusCode: 410 },
  
    // Configuration Errors
    { code: 'INVALID_CONFIG', message: 'The system configuration is invalid or corrupted.', category: 'Configuration', statusCode: 500 },
    { code: 'CONFIG_UPDATE_FAILED', message: 'Failed to update the system configuration.', category: 'Configuration', statusCode: 500 },
  
    // Server Errors
    { code: 'SERVER_BUSY', message: 'The server is currently busy. Please try again later.', category: 'Server', statusCode: 503 },
    { code: 'SERVER_UNAVAILABLE', message: 'The server is currently unavailable. Please try again later.', category: 'Server', statusCode: 503 },
  
    // File Handling Errors
    { code: 'FILE_READ_ERROR', message: 'An error occurred while reading the file.', category: 'File Handling', statusCode: 500 },
    { code: 'FILE_WRITE_ERROR', message: 'An error occurred while writing to the file.', category: 'File Handling', statusCode: 500 },
    { code: 'FILE_DELETE_FAILED', message: 'Failed to delete the specified file.', category: 'File Handling', statusCode: 500 },
  
    // Subscription Errors
    { code: 'SUBSCRIPTION_EXPIRED', message: 'Your subscription has expired. Please renew to continue.', category: 'Subscription', statusCode: 403 },
    { code: 'SUBSCRIPTION_NOT_FOUND', message: 'The requested subscription could not be found.', category: 'Subscription', statusCode: 404 },
    { code: 'SUBSCRIPTION_LIMIT_REACHED', message: 'You have reached the maximum number of subscriptions allowed.', category: 'Subscription', statusCode: 403 },
  
    // Security Errors
    { code: 'ACCESS_TOKEN_EXPIRED', message: 'The access token has expired and is no longer valid.', category: 'Security', statusCode: 401 },
    { code: 'ACCESS_TOKEN_INVALID', message: 'The provided access token is invalid or malformed.', category: 'Security', statusCode: 401 },
    { code: 'CSRF_TOKEN_MISSING', message: 'CSRF token is missing from the request.', category: 'Security', statusCode: 400 },
    { code: 'CSRF_TOKEN_INVALID', message: 'CSRF token is invalid.', category: 'Security', statusCode: 400 },
  
    // Rate-Limiting Errors
    { code: 'TOO_MANY_REQUESTS', message: 'Too many requests have been made in a short period of time. Please try again later.', category: 'Rate-Limiting', statusCode: 429 },
    { code: 'API_RATE_LIMIT_REACHED', message: 'API rate limit has been reached. Please wait and try again.', category: 'Rate-Limiting', statusCode: 429 },
  
    // Proxy Errors
    { code: 'PROXY_ERROR', message: 'An error occurred while routing through the proxy server.', category: 'Proxy', statusCode: 502 },
    { code: 'PROXY_TIMEOUT', message: 'The request to the proxy server timed out.', category: 'Proxy', statusCode: 504 },
  
    // API Version Errors
    { code: 'API_VERSION_NOT_SUPPORTED', message: 'The API version is not supported.', category: 'API Versioning', statusCode: 400 },
    { code: 'API_VERSION_DEPRECATED', message: 'The requested API version is deprecated.', category: 'API Versioning', statusCode: 410 },
  
    // User Account Errors
    { code: 'USER_ALREADY_EXISTS', message: 'A user with this username already exists.', category: 'User Account', statusCode: 409 },
    { code: 'USER_ACCOUNT_LOCKED', message: 'The user account is locked due to multiple failed attempts.', category: 'User Account', statusCode: 423 },
  
    // Language and Localization Errors
    { code: 'INVALID_LANGUAGE', message: 'The requested language is not supported.', category: 'Localization', statusCode: 400 },
    { code: 'TRANSLATION_FAILED', message: 'Failed to translate the requested content.', category: 'Localization', statusCode: 500 },
  
    // Monitoring and Logging Errors
    { code: 'MONITORING_ERROR', message: 'An error occurred while monitoring the system.', category: 'Monitoring & Logging', statusCode: 500 },
    { code: 'LOGGING_ERROR', message: 'An error occurred while logging the request.', category: 'Monitoring & Logging', statusCode: 500 }
  ];

module.exports = { CustomMessages: ErrorCode };  