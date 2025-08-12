import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "Which course is right for me?",
      answer: "We offer courses for all skill levels - from complete beginners to advanced professionals. Browse our course catalog and read the descriptions to find the perfect match for your current knowledge and goals."
    },
    {
      id: 2,
      question: "How do I register to take classes?",
      answer: "Registration is simple! Just browse our course catalog, select the course you want, and click 'Enroll'. You'll have immediate access to all course materials and can start learning right away."
    },
    {
      id: 3,
      question: "Is there a fee to take the class?",
      answer: "We offer both free and premium courses. Many of our courses are completely free, while premium courses offer additional features like certificates, instructor support, and advanced materials."
    },
    {
      id: 4,
      question: "What kind of material is taught in class?",
      answer: "Our courses include comprehensive learning materials including video lectures, reading materials, practice exercises, quizzes, and real-world projects. Each course is designed to provide practical, hands-on learning."
    },
    {
      id: 5,
      question: "Are the instructors experienced?",
      answer: "Yes! All our instructors are industry professionals with years of experience in their respective fields. They bring real-world expertise and practical knowledge to every course."
    },
    {
      id: 6,
      question: "Can this help me advance in my career?",
      answer: "Absolutely! Our courses are designed to provide practical skills that are directly applicable in the workplace. Many of our students have successfully advanced their careers or transitioned to new roles."
    },
    {
      id: 7,
      question: "Can I get a certificate upon completion?",
      answer: "Yes! Upon successful completion of any course, you'll receive a digital certificate that you can download, print, or share on professional platforms like LinkedIn."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our learning platform and courses
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <button
                className="w-full text-left flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-gray-900 pr-4 text-left">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 border-t border-gray-200">
                  <p className="text-gray-600 leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 