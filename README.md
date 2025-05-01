# CRO Scanner

## Overview
CRO Scanner is a web application designed to analyze and optimize websites for Conversion Rate Optimization (CRO). It leverages advanced tools and APIs, including Google PageSpeed Insights and GPT-based services, to provide actionable insights and recommendations for improving website performance and user experience.

## Features
- **Audit Reports**: Generate detailed audit reports for any website, highlighting areas for improvement.
- **Performance Metrics**: Analyze key performance indicators such as load time, interactivity, and visual stability.
- **AI-Powered Insights**: Utilize GPT-based services to provide tailored recommendations for CRO.
- **Interactive Charts**: Visualize audit results with dynamic and user-friendly charts.
- **Customizable Inputs**: Easily input URLs to scan and receive instant feedback.

## Project Structure
The project is divided into two main parts:

### Client
The client-side is built with Next.js and Tailwind CSS for a modern, responsive, and fast user interface.
- **Key Files and Folders**:
  - `src/app`: Contains the main application pages and layout.
  - `src/components`: Reusable React components like `AuditReport`, `Charts`, and `Header`.
  - `public`: Static assets such as SVGs and icons.
  - `tailwind.config.ts`: Configuration for Tailwind CSS.

### Server
The server-side handles API requests and integrates with external services.
- **Key Files and Folders**:
  - `routes/audit.js`: Defines the API endpoints for auditing websites.
  - `services/gptService.js`: Handles GPT-based recommendations.
  - `services/psiService.js`: Integrates with Google PageSpeed Insights.

## Installation

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/cro-scanner.git
   ```
2. Navigate to the project directory:
   ```bash
   cd cro-scanner
   ```
3. Install dependencies for both client and server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

## Usage

### Development
To start the development server:
1. Run the client:
   ```bash
   cd client && npm run dev
   ```
2. Run the server:
   ```bash
   cd server && npm start
   ```
3. Open your browser and navigate to `http://localhost:3000`.

### Production
To build and run the application in production mode:
1. Build the client:
   ```bash
   cd client && npm run build
   ```
2. Start the server:
   ```bash
   cd server && npm start
   ```

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For questions or support, please contact [your-email@example.com].