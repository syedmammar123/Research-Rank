# 🧬 Research Scoring Platform



![Demo](/src/assets/demo.gif)
--

> ⚠️ Due to paid APIs, if you truly want to use this product or learn more about it, please contact me at **syedmammar123 [at] gmail [dot] com**.

---

## 📖 Overview

**Research Scoring Platform** is a comprehensive web application designed to evaluate and score research products for medical professionals, particularly those in academic medicine. The platform provides an AI-powered scoring system that analyzes research publications, calculates impact factors, and generates comprehensive reports for research evaluation and ranking purposes.

## 🎯 Purpose

The platform serves multiple purposes in the academic and medical research community:

- **Research Evaluation**: Score and rank research products based on multiple criteria
- **Impact Assessment**: Calculate journal impact factors and publication quality metrics
- **Student Assessment**: Evaluate medical students' research portfolios for admissions
- **Specialty Alignment**: Analyze research relevance to specific medical specialties
- **Performance Tracking**: Monitor and compare research productivity across individuals
- **Report Generation**: Create detailed PDF reports with visualizations and rankings

## ⚙️ How It Works

### 1. **User Authentication & Profile Setup**
- Secure Firebase authentication system
- User profile creation with specialty selection
- Role-based access control (professors, evaluators)

### 2. **Research Product Management**
- **Student Information**: Personal details, medical school, photo upload
- **Research Products**: Publication details, authors, research type, publication status
- **Supporting Documents**: Letters of Recommendation (LOR), Statement of Purpose (SOP)
- **Bulk Import**: Excel file support for multiple student data entry

### 3. **Scoring Algorithm**
The platform uses a sophisticated scoring system based on:

#### **Research Metrics (Weighted Scoring)**
- **Total Research Products**: Base score multiplier
- **Specialty Alignment**: AI-powered analysis of research relevance
- **Author Position**: First author vs. co-author scoring
- **Publication Type**: Peer-reviewed articles, abstracts, presentations
- **Publication Status**: Published, accepted, submitted
- **Journal Impact Factor**: Quality assessment of publication venues

#### **AI-Powered Analysis**
- **OpenAI Integration**: Natural language processing for content analysis
- **Specialty Matching**: AI evaluation of research relevance to medical specialties
- **Content Analysis**: Automated assessment of SOP and LOR quality
- **Characteristic Matching**: Personality and skill trait alignment

#### **Characteristic Evaluation**
- **50+ Professional Traits**: Compassion, leadership, communication skills
- **Multi-dimensional Assessment**: Technical skills, interpersonal abilities, work ethic
- **Weighted Scoring**: Customizable importance levels for different characteristics

### 4. **Results & Reporting**
- **Individual Scores**: Research score, SOP score, LOR score
- **Comparative Analysis**: Ranking against peer group
- **Statistical Visualization**: Bell curve distributions, percentile rankings
- **PDF Export**: Professional reports with charts and detailed breakdowns
- **Historical Tracking**: Performance trends over time

## 🛠️ Tech Stack

### **Frontend**
- **React 18.2.0**: Modern React with hooks and functional components
- **React Router DOM 6.22.0**: Client-side routing and navigation
- **Vite 5.1.0**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for responsive design

### **Backend & Database**
- **Firebase 10.8.0**: 
  - Authentication (Firebase Auth)
  - Firestore Database
  - Cloud Storage (for image uploads)
- **Firebase Security Rules**: Data access control and validation

### **AI & Analytics**
- **OpenAI API**: GPT models for content analysis and specialty matching
- **Chart.js 4.4.4**: Data visualization and chart generation
- **Plotly.js 2.35.0**: Advanced statistical plotting
- **React Chart Components**: Chart.js and Plotly.js React wrappers

### **Data Processing**
- **XLSX 0.18.5**: Excel file import/export functionality
- **UUID 10.0.0**: Unique identifier generation
- **Custom Algorithms**: Research scoring and impact factor calculations

### **Document Generation**
- **jsPDF 2.5.1**: PDF report generation
- **html2canvas 1.4.1**: HTML to image conversion for PDF charts

### **Development Tools**
- **ESLint**: Code quality and consistency
- **React DevTools**: Development debugging
- **Vite Dev Server**: Hot module replacement

## 🏥 Target Users

### **Primary Users**
- **Medical Professors**: Research evaluation and student assessment
- **Academic Evaluators**: Research portfolio analysis
- **Medical School Admissions**: Student research assessment
- **Research Committees**: Publication quality evaluation

### **Secondary Users**
- **Medical Students**: Portfolio tracking and improvement
- **Research Institutions**: Performance benchmarking
- **Grant Committees**: Research productivity assessment

## 🔐 Security Features

- **Firebase Authentication**: Secure user login and session management
- **Role-based Access**: Different permissions for different user types
- **Data Encryption**: Secure storage of sensitive research data
- **Input Validation**: Comprehensive form validation and sanitization
- **Protected Routes**: Authentication-required access to sensitive features

## 📊 Data Management

### **User Data**
- Profile information (name, specialty, institution)
- Authentication credentials
- User preferences and settings

### **Research Data**
- Student information and demographics
- Research product details
- Supporting documents (LOR, SOP)
- Scoring results and historical data

### **Analytics Data**
- Impact factor database (60,000+ journals)
- Characteristic trait definitions
- Scoring algorithms and weights
- Performance metrics and benchmarks

## 🚀 Key Features

### **Core Functionality**
- ✅ User authentication and profile management
- ✅ Research product data entry and management
- ✅ AI-powered specialty alignment analysis
- ✅ Comprehensive scoring algorithms
- ✅ PDF report generation
- ✅ Excel import/export capabilities
- ✅ Image upload and storage
- ✅ Real-time data validation

### **Advanced Features**
- ✅ OpenAI-powered content analysis
- ✅ Impact factor calculations
- ✅ Statistical visualization and charts
- ✅ Comparative ranking systems
- ✅ Historical performance tracking
- ✅ Bulk data processing
- ✅ Responsive mobile design

## 🔧 Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager
- Firebase project setup
- OpenAI API access

### **Environment Variables**
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_OPENAI_KEY=your_openai_api_key
VITE_THREAD_ID_1=your_openai_thread_id
VITE_ASST_ID_1=your_openai_assistant_id
```

### **Development Commands**
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## 📱 User Interface

### **Design Philosophy**
- **Modern & Clean**: Professional academic interface
- **Responsive**: Works seamlessly on all devices
- **Accessible**: WCAG compliant design patterns
- **Intuitive**: User-friendly navigation and workflows

### **Key Interfaces**
- **Landing Page**: Public introduction and authentication entry
- **Dashboard**: Main application interface with navigation
- **Research Entry**: Comprehensive data input forms
- **Results View**: Scoring results and visualizations
- **Report Generation**: PDF export functionality

## 🔮 Future Enhancements

### **Planned Features**
- **Multi-language Support**: International research evaluation
- **Advanced Analytics**: Machine learning scoring improvements
- **Collaborative Features**: Team evaluation and peer review
- **API Integration**: Third-party research database connections
- **Mobile App**: Native iOS and Android applications

### **Technical Improvements**
- **Backend Migration**: Move OpenAI calls to secure backend
- **Performance Optimization**: Code splitting and lazy loading
- **Testing Suite**: Comprehensive unit and integration tests
- **TypeScript Migration**: Enhanced type safety and developer experience

## 📄 License

This project is proprietary software developed for academic research evaluation purposes.

## 🤝 Contributing

For development contributions, please contact the development team for access and contribution guidelines.

---

**Research Scoring Platform** - Empowering academic excellence through intelligent research evaluation and assessment.
