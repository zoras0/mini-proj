import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I create an account on the FCRIT Internship Portal?",
    answer: "To create an account, click on the 'Sign Up' button on the homepage. Fill in your details, including your FCRIT email address, and follow the verification process. Once verified, you can log in and start using the portal."
  },
  {
    question: "Can I apply for multiple internships at the same time?",
    answer: "Yes, you can apply for multiple internships simultaneously. However, make sure to tailor your application for each position and only apply for internships that genuinely interest you and match your skills."
  },
  {
    question: "How can I improve my chances of getting selected for an internship?",
    answer: "To improve your chances, make sure your profile is complete and up-to-date. Highlight relevant skills and projects, craft a strong resume, and write compelling cover letters for each application. Also, prepare well for interviews and utilize the resources available on the portal."
  },
  {
    question: "What should I do if I face technical issues while using the portal?",
    answer: "If you encounter any technical issues, first try clearing your browser cache and cookies. If the problem persists, contact our support team at support@fcrit.ac.in or use the 'Help' section in the portal to report the issue."
  },
  {
    question: "How long does the internship application process usually take?",
    answer: "The application process duration can vary depending on the employer. Typically, you can expect to hear back within 2-4 weeks after the application deadline. Some companies may respond sooner, while others might take longer. You can check the status of your applications in your student dashboard."
  },
  {
    question: "Are there any fees associated with using the FCRIT Internship Portal?",
    answer: "No, the FCRIT Internship Portal is a free service provided to all FCRIT students. There are no fees for creating an account, applying for internships, or using any of the portal's features."
  },
  {
    question: "Can alumni use the FCRIT Internship Portal?",
    answer: "The FCRIT Internship Portal is primarily designed for current students. However, recent graduates (within one year of graduation) may be granted limited access to the portal. Please contact the Career Services office for more information on alumni access."
  },
  {
    question: "How can employers post internship opportunities on the portal?",
    answer: "Employers can create an account on the portal and submit their internship listings for approval. Once approved by the FCRIT administration, the internship will be visible to students. Employers can manage their listings, view applications, and communicate with candidates through the portal."
  }
];

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prevOpenItems =>
      prevOpenItems.includes(index)
        ? prevOpenItems.filter(item => item !== index)
        : [...prevOpenItems, index]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={() => toggleItem(index)}
            >
              <h2 className="text-xl font-semibold">{item.question}</h2>
              {openItems.includes(index) ? (
                <ChevronUp className="flex-shrink-0 ml-2" />
              ) : (
                <ChevronDown className="flex-shrink-0 ml-2" />
              )}
            </button>
            {openItems.includes(index) && (
              <p className="mt-4 text-gray-600">{item.answer}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Can't find an answer?</h2>
        <p className="mb-4">
          If you couldn't find the answer to your question, please don't hesitate to contact us. We're here to help!
        </p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQ;