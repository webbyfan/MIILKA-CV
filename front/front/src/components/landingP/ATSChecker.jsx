import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function ATSChecker() {
  return (
    <section
      id="ats"
      className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ATS-Optimized for Success
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              75% of resumes never reach human eyes. Our ATS Checker ensures
              your resume passes through Applicant Tracking Systems and lands in
              the right hands.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">
                    No Complex Formatting
                  </p>
                  <p className="text-sm text-gray-600">
                    Clean layouts that every ATS system can read
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">
                    Keyword Optimization
                  </p>
                  <p className="text-sm text-gray-600">
                    AI suggests keywords from job descriptions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">
                    Structure Analysis
                  </p>
                  <p className="text-sm text-gray-600">
                    Detects issues like tables, icons, and columns
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">
                    Compatibility Score
                  </p>
                  <p className="text-sm text-gray-600">
                    Get a real-time ATS compatibility percentage
                  </p>
                </div>
              </div>
            </div>

            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105">
              Check Your Resume Now
            </button>
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                ATS Compatibility Check
              </h3>

              {/* Score Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 mb-6 border border-green-200">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 font-semibold">
                    Your ATS Score
                  </p>
                  <div className="text-5xl font-bold text-green-600 my-2">
                    94%
                  </div>
                  <p className="text-sm text-green-700">
                    Excellent - Ready to Submit!
                  </p>
                </div>

                {/* Progress Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                      <span>Format</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                      <span>Keywords</span>
                      <span>88%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "88%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                      <span>Structure</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Issues Found */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Minor Issues Found
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 p-3 bg-amber-50 rounded border border-amber-200">
                    <span className="text-amber-600 font-semibold">•</span>
                    <span className="text-amber-900">
                      Consider adding more industry keywords for better matching
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
