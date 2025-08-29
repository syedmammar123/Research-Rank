// import  { useEffect, useState } from 'react';
// import styles from './CheckboxGroup.module.css';

// const CheckboxGroup = ({ selectedItems,onSelectionChange }) => {
//   const [checkedItems, setCheckedItems] = useState([]);

//   useEffect(() => {
//     setCheckedItems(selectedItems);
//   }, [selectedItems]);

//   const items = [
//     "Compassionate", "Empathetic", "Patient", "Detail-oriented", "Dependable",
//     "Adaptable", "Strong work ethic", "Team player", "Good communicator", "Resilient",
//     "Critical thinker", "Problem-solver", "Organized", "Punctual", "Motivated",
//     "Culturally sensitive", "Good listener", "Open-minded", "Professional", "Honest",
//     "Respectful", "Calm under pressure", "Dedicated", "Willing to learn", "Self-aware",
//     "Self-directed", "Ethical", "Caring", "Confident", "Strong clinical skills",
//     "Good bedside manner", "Able to multitask", "Reliable", "Good judgment", "Resourceful",
//     "Emotionally intelligent", "Physically resilient", "Emotionally resilient", "Strong interpersonal skills",
//     "Adaptable to technology", "Knowledgeable", "Energetic", "Enthusiastic", "Approachable",
//     "Humility", "Curious", "Efficient", "Proactive", "Good time management",
//     "Flexible", "Positive attitude", "Focused", "Attention to detail", "Strong leadership skills",
//     "Collaborative", "Good writing skills", "Diplomatic", "Good sense of humor", "Courageous",
//     "Strong decision-maker", "Practical", "Innovative", "Good problem prioritization", "Supportive",
//     "Good teaching skills", "Analytical", "Good self-care practices", "Self-reflective", "Respects patient autonomy",
//     "Good at delegation", "Ethically-minded", "Understands patient confidentiality", "Handles criticism well", "Persistent",
//     "Loyal", "Mentor-oriented", "Good public speaking skills", "Compassion for coworkers", "Strong commitment to patient care",
//     "Values teamwork", "Knowledgeable about latest research", "Nonjudgmental", "Works well under supervision", "Adheres to protocols",
//     "Good self-discipline", "Clear communicator", "Good at building rapport", "Intellectually curious", "Accountable",
//     "Takes initiative", "Handles conflict well", "Good organizational skills", "Detail-focused in documentation", "Proficient in medical procedures",
//     "Good hand-eye coordination", "Emotionally stable", "Good at managing stress", "Good at prioritizing tasks", "Values continuous improvement",
//     "Committed to lifelong learning"
//   ];

//   const handleCheckboxChange = (event) => {
//     const { value, checked } = event.target;
//     const updatedCheckedItems = checked
//       ? [...checkedItems, value]
//       : checkedItems.filter(item => item !== value);
//     setCheckedItems(updatedCheckedItems);
//     onSelectionChange(updatedCheckedItems);
//   };

//   return (
//     <div className={styles.checkboxGrid}>
//       {items.map((item, index) => (
//         <label key={index} className={styles.checkboxLabel}>
//           <input
//             type="checkbox"
//             value={item}
//             checked={checkedItems.includes(item)}
//             onChange={handleCheckboxChange}
//           />
//           {index+1}. {item}
//         </label>
//       ))}
//     </div>
//   );
// };

// export default CheckboxGroup;


import React, { useEffect, useState } from 'react';

const CheckboxGroup = ({ selectedItems, onSelectionChange }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCheckedItems(selectedItems);
  }, [selectedItems]);

  const items = [
    "Compassionate", "Empathetic", "Patient", "Detail-oriented", "Dependable",
    "Adaptable", "Strong work ethic", "Team player", "Good communicator", "Resilient",
    "Critical thinker", "Problem-solver", "Organized", "Punctual", "Motivated",
    "Culturally sensitive", "Good listener", "Open-minded", "Professional", "Honest",
    "Respectful", "Calm under pressure", "Dedicated", "Willing to learn", "Self-aware",
    "Self-directed", "Ethical", "Caring", "Confident", "Strong clinical skills",
    "Good bedside manner", "Able to multitask", "Reliable", "Good judgment", "Resourceful",
    "Emotionally intelligent", "Physically resilient", "Emotionally resilient", "Strong interpersonal skills",
    "Adaptable to technology", "Knowledgeable", "Energetic", "Enthusiastic", "Approachable",
    "Humility", "Curious", "Efficient", "Proactive", "Good time management",
    "Flexible", "Positive attitude", "Focused", "Attention to detail", "Strong leadership skills",
    "Collaborative", "Good writing skills", "Diplomatic", "Good sense of humor", "Courageous",
    "Strong decision-maker", "Practical", "Innovative", "Good problem prioritization", "Supportive",
    "Good teaching skills", "Analytical", "Good self-care practices", "Self-reflective", "Respects patient autonomy",
    "Good at delegation", "Ethically-minded", "Understands patient confidentiality", "Handles criticism well", "Persistent",
    "Loyal", "Mentor-oriented", "Good public speaking skills", "Compassion for coworkers", "Strong commitment to patient care",
    "Values teamwork", "Knowledgeable about latest research", "Nonjudgmental", "Works well under supervision", "Adheres to protocols",
    "Good self-discipline", "Clear communicator", "Good at building rapport", "Intellectually curious", "Accountable",
    "Takes initiative", "Handles conflict well", "Good organizational skills", "Detail-focused in documentation", "Proficient in medical procedures",
    "Good hand-eye coordination", "Emotionally stable", "Good at managing stress", "Good at prioritizing tasks", "Values continuous improvement",
    "Committed to lifelong learning"
  ];

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const updatedCheckedItems = checked
      ? [...checkedItems, value]
      : checkedItems.filter(item => item !== value);
    setCheckedItems(updatedCheckedItems);
    onSelectionChange(updatedCheckedItems);
  };

  const handleKeyPress = (e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const checkbox = e.target.querySelector('input[type="checkbox"]') || e.target;
      const isCurrentlyChecked = checkedItems.includes(item);
      const updatedCheckedItems = isCurrentlyChecked
        ? checkedItems.filter(checkedItem => checkedItem !== item)
        : [...checkedItems, item];
      setCheckedItems(updatedCheckedItems);
      onSelectionChange(updatedCheckedItems);
    }
  };

  const clearAll = () => {
    setCheckedItems([]);
    onSelectionChange([]);
  };

  const selectPopular = () => {
    const popularItems = [
      "Compassionate", "Detail-oriented", "Strong work ethic", "Team player", "Good communicator",
      "Critical thinker", "Professional", "Dedicated", "Strong clinical skills", "Reliable"
    ];
    setCheckedItems(popularItems);
    onSelectionChange(popularItems);
  };

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search characteristics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={selectPopular}
            className="inline-flex items-center px-3 py-2 border border-indigo-300 text-sm font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Select Popular
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All
          </button>
        </div>
      </div>

      {/* Results Summary */}
      {searchTerm && (
        <div className="text-sm text-gray-600">
          Showing {filteredItems.length} of {items.length} characteristics
          {filteredItems.length === 0 && (
            <span className="text-red-600 ml-1">- No matches found</span>
          )}
        </div>
      )}

      {/* Checkbox Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
        {filteredItems.map((item, index) => {
          const originalIndex = items.indexOf(item);
          const isChecked = checkedItems.includes(item);
          
          return (
            <label
              key={originalIndex}
              className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm ${
                isChecked
                  ? 'bg-indigo-50 border-indigo-200 shadow-sm'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onKeyPress={(e) => handleKeyPress(e, item)}
              tabIndex={0}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  value={item}
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                {isChecked && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-600 rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    isChecked 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {originalIndex + 1}
                  </span>
                  <span className={`text-sm font-medium truncate ${
                    isChecked ? 'text-indigo-900' : 'text-gray-900'
                  }`}>
                    {item}
                  </span>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {filteredItems.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5.207-1.955L6 18l-1.955.793A7.962 7.962 0 012.05 12.207a7.962 7.962 0 011.955-5.207L4 6l.793-1.955A7.962 7.962 0 0112.207 2.05a7.962 7.962 0 015.207 1.955L18 4l1.955.793a7.962 7.962 0 011.955 5.207 7.962 7.962 0 01-1.955 5.207L20 16l-.793 1.955z" />
          </svg>
          <p className="text-gray-500 text-sm">No characteristics match your search</p>
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="mt-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Selection Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Selected Characteristics: {checkedItems.length}
          </span>
          <div className="flex items-center space-x-2">
            {checkedItems.length >= 5 && checkedItems.length <= 10 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Valid
              </span>
            )}
            {checkedItems.length < 5 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Need {5 - checkedItems.length} more
              </span>
            )}
            {checkedItems.length > 10 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {checkedItems.length - 10} too many
              </span>
            )}
          </div>
        </div>
        
        {checkedItems.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {checkedItems.slice(0, 5).map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {item}
              </span>
            ))}
            {checkedItems.length > 5 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{checkedItems.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="text-xs text-gray-500 text-center">
        Press Enter or Space to toggle selections • Use search to find specific characteristics
      </div>
    </div>
  );
};

export default CheckboxGroup;