import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    id: 1,
    question: "What makes MilkaaCV different from other resume builders?",
    answer:
      "MilkaaCV combines AI-powered writing assistance with ATS optimization. Our templates are guaranteed to pass Applicant Tracking Systems, and we provide real-time suggestions to improve your resume while you build it.",
  },
  {
    id: 2,
    question: "Is my resume information secure and private?",
    answer:
      "Yes, we take security seriously. All resumes are encrypted and stored securely on our servers. Your data is never shared with third parties, and you can delete your account and all associated data anytime.",
  },
  {
    id: 3,
    question: "Can I export my resume as PDF?",
    answer:
      "Absolutely! All plans include PDF export functionality. You can download your resume in PDF format with perfect formatting and ATS compatibility.",
  },
  {
    id: 4,
    question: "How does the AI writing feature work?",
    answer:
      "Our AI-powered writing feature uses OpenAI technology to enhance your bullet points, improve grammar, and suggest better wording. You can ask it to make your achievements more impressive or more concise.",
  },
  {
    id: 5,
    question: "What is the ATS Compatibility Score?",
    answer:
      "The ATS score is a percentage that indicates how well your resume will be parsed by Applicant Tracking Systems. It checks for proper formatting, keywords, and structure. A score of 85% or higher is excellent.",
  },
  {
    id: 6,
    question: "Can I switch templates after creating my resume?",
    answer:
      "Yes! You can change templates anytime. Your content will be automatically adapted to the new template, so you won't lose any information.",
  },
  {
    id: 7,
    question: "How many resumes can I create?",
    answer:
      "With the Free plan, you can create 1 resume. Professional and Elite plans offer unlimited resumes, so you can tailor multiple versions for different job applications.",
  },
  {
    id: 8,
    question: "Do you offer a money-back guarantee?",
    answer:
      "Yes! We offer a 30-day money-back guarantee on our paid plans. If you're not satisfied with our service, simply contact our support team for a full refund.",
  },
];

export default function FAQ() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section id="faq" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about MilkaaCV
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-indigo-300 transition"
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === item.id ? null : item.id)
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <span className="text-left font-semibold text-gray-900">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-indigo-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedId === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 py-4 bg-gray-50 border-t border-gray-200"
                  >
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition transform hover:scale-105">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}
