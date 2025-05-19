import express from 'express'
import type { Request, Response } from 'express'
import { config } from 'dotenv';
import cors from 'cors';
import morgan from "morgan";
import nodemailer from 'nodemailer';

// Load environment variables
config()

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))
app.use('/api', router);

// Email sending route
router.post('/send-email', async (req: Request, res: Response): Promise<Response> => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: to, subject, and either text or html'
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    
    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check route
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Example route
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from Express!',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});