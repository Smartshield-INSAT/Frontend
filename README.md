# SMARTSHIELD INSAT: A frontend React Application for Security Monitoring

This React application provides a comprehensive security monitoring solution with features for real-time data analysis, offense monitoring, and device management. The application includes multiple pages to offer users insights and controls over monitored devices and security metrics.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Pages Overview](#pages-overview)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Features

- **Home (Dashboard):** Displays real-time security metrics with line and bar charts, a recent offenses panel, and an interactive risk category breakdown.
- **Detailed Analysis:** Provides in-depth analysis of security logs and offenses.
- **Offenses:** Lists recent security offenses detected in the system.
- **Devices:** Displays information about monitored devices and allows users to view detailed data on device activity.
- **Settings:** Allows customization and configuration of application settings.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Smartshield-INSAT/Frontend.git
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm start
   ```

4. **Environment Variables:**
   Ensure the API `BASE_URL` is set up in the component or moved to an environment configuration file as needed.

## Usage

The app runs on `http://localhost:3000` by default. Access it in a browser to start monitoring real-time security metrics, offenses, and device activity.

## Project Structure

The project follows a typical React structure with components and pages organized by functionality.

- **components/**: Reusable components such as `MetricCard`, `UserRow`, `CustomPieChart`, and `OffenseCard`.
- **pages/**: Main pages of the application, including Home, Detailed Analysis, Offenses, Devices, and Settings.
- **App.js**: Root component that sets up routes to different pages.
- **index.js**: Entry point of the React application.

## Pages Overview

### Home (Dashboard)
Displays core security metrics and charts:
  - Real-time logs count (updated every 5 minutes)
  - Number of monitored devices
  - Line chart of system score over time
  - Pie chart for risk category breakdown
  - Bar chart showing devices with the highest requests

### Detailed Analysis
Allows users to delve deeper into security logs, with filtering options for specific metrics and annotations.

### Offenses
Lists recent offenses detected in the system, providing a breakdown of threats and potential risks.

### Devices
Displays a list of all monitored devices, with the ability to view more detailed statistics about each device’s activity.

### Settings
Allows users to adjust settings for the application, including API configurations and refresh intervals.

## Technologies Used

- **React**: Frontend framework
- **Chart.js**: Used for displaying charts (line, bar, and pie charts)
- **Axios**: For making API requests
- **Lucide Icons**: Icons for UI elements
- **CSS Framework**: Tailwind CSS (or other CSS styling framework as relevant)

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

