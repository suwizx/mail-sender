# Mail Sender Application

A Node.js application for sending emails using Gmail SMTP.

## Prerequisites

- Docker and Docker Compose installed on your system
- Gmail account with App Password enabled

## Environment Setup

1. Create a `.env` file in the project root with the following variables:
```env
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your-app-specific-password
```

Note: For Gmail, you need to use an App Password. To generate one:
1. Go to your Google Account settings
2. Navigate to Security > 2-Step Verification
3. Scroll down to App passwords
4. Generate a new app password for "Mail"

## Running with Docker

### Build and Start the Application

```bash
# Build and start the containers
docker-compose up --build

# To run in detached mode (background)
docker-compose up -d
```

### Stop the Application

```bash
# Stop the containers
docker-compose down
```

### View Logs

```bash
# View logs of running containers
docker-compose logs -f
```

## API Endpoints

### Send Email
```bash
POST /api/send-email
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Your email subject",
  "text": "Plain text content",
  "html": "<p>HTML content</p>"
}
```

### Health Check
```bash
GET /api/health
```

## Development

The application is configured with hot-reloading for development. Any changes to the source code will automatically restart the server.

## Troubleshooting

1. If you get authentication errors:
   - Verify your Gmail credentials in the `.env` file
   - Ensure you're using an App Password, not your regular Gmail password
   - Check if 2-Step Verification is enabled on your Google Account

2. If the container fails to start:
   - Check the logs using `docker-compose logs`
   - Verify all environment variables are set correctly
   - Ensure port 3000 is not in use by another application

## License

MIT
