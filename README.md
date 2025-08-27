# Mom Guide Plus

A comprehensive React.js web application designed to support mothers throughout their parenting journey. Features a modern sidebar navigation with multiple health and wellness modules.

## Features

- **Dashboard (Home)**: Baby tracking with feeding, sleep, and milestone monitoring
- **Pregnancy Tracker**: Week-by-week pregnancy progress, symptoms, and appointments
- **Appointments**: Medical appointment scheduling and management
- **Medications**: Prescription tracking and medication reminders
- **Records**: Medical document management and storage
- **Mental Health**: Mood tracking, stress monitoring, and wellness activities
- **Devices**: Connected health device management
- **Video**: Telehealth consultations and video appointments
- **Analytics**: Health data visualization and insights
- **Billing**: Subscription management and payment history

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd mom-guide-plus
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
mom-guide-plus/
├── public/
│   ├── index.html          # Main HTML file
│   └── manifest.json       # Web app manifest
├── src/
│   ├── components/
│   │   ├── Layout.tsx      # Main layout with sidebar
│   │   └── Sidebar.tsx     # Navigation sidebar
│   ├── pages/
│   │   ├── Home.tsx        # Dashboard (baby tracking)
│   │   ├── Pregnancy.tsx   # Pregnancy tracker
│   │   ├── Appointments.tsx # Appointment management
│   │   ├── Medications.tsx # Medication tracking
│   │   ├── Records.tsx     # Medical records
│   │   ├── MentalHealth.tsx # Mental wellness
│   │   ├── Devices.tsx     # Health devices
│   │   ├── Video.tsx       # Video consultations
│   │   ├── Analytics.tsx   # Health analytics
│   │   └── Billing.tsx     # Billing & payments
│   ├── App.tsx             # Main app component
│   ├── index.tsx           # Entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Pages & Features

### Dashboard (Home)

- Baby information display
- Feeding tracking with logs
- Sleep monitoring with charts
- Development milestone tracking
- Tabbed interface for different features

### Pregnancy Tracker

- Week-by-week pregnancy progress
- Due date calculator
- Symptom tracking
- Prenatal appointment management
- Pregnancy milestone tracking

### Appointments

- Medical appointment scheduling
- Doctor information
- Appointment status tracking
- Notes and reminders

### Medications

- Prescription management
- Dosage tracking
- Refill reminders
- Medication history

### Records

- Medical document storage
- Lab results and reports
- Imaging files
- Document sharing

### Mental Health

- Mood tracking
- Stress level monitoring
- Wellness activities
- Mental health resources

### Devices

- Connected health device management
- Wearable integration
- Device status monitoring
- Data synchronization

### Video

- Telehealth consultations
- Video appointment scheduling
- Remote healthcare access
- Consultation history

### Analytics

- Health data visualization
- Progress tracking
- Trend analysis
- Personalized insights

### Billing

- Subscription management
- Payment history
- Invoice tracking
- Payment method management

## Design Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Sidebar Navigation**: Easy access to all modules
- **Modern UI**: Clean, professional design with smooth animations
- **Color-Coded Modules**: Each section has its own color theme
- **Interactive Elements**: Hover effects, transitions, and animations
- **Accessibility**: Proper contrast and keyboard navigation

## Customization

### Colors

The application uses a comprehensive color palette:

- **Primary**: Orange/Amber tones for main actions
- **Secondary**: Blue tones for secondary actions
- **Module Colors**: Each page has its own color theme (pink for pregnancy, purple for medications, etc.)

### Styling

- Global styles are in `src/index.css`
- Component-specific styles use Tailwind CSS classes
- Custom CSS components are defined in the `@layer components` section

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please open an issue in the repository.

---

Built with ❤️ for mothers everywhere
