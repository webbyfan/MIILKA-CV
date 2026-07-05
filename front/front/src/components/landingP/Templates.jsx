import React, { useState } from "react";
import { motion } from "framer-motion";

const templates = [
  {
    id: 1,
    name: "Professional",
    description: "Classic and timeless design",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    name: "Modern",
    description: "Contemporary layout with clean lines",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: 3,
    name: "Minimal",
    description: "Elegant and distraction-free",
    color: "from-gray-600 to-gray-800",
  },
  {
    id: 4,
    name: "Tech",
    description: "Perfect for developers and designers",
    color: "from-green-500 to-emerald-600",
  },
];

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Beautiful ATS-Safe Templates
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from professionally designed templates that pass every ATS
            system
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedTemplate(template.id)}
              className={`cursor-pointer p-4 rounded-lg border-2 transition ${
                selectedTemplate === template.id
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              <div
                className={`h-32 rounded bg-gradient-to-br ${template.color} mb-4`}
              ></div>
              <h3 className="font-bold text-gray-900 mb-1">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-2xl p-8 border border-gray-200"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="border-b pb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Ashagire Biru
              </h2>
              <p className="text-gray-600">
                Addis Ababa, Ethiopia | +2519123456 | ashu@example.com |
                linkedin.com/in/Ashagrachew
              </p>
            </div>

            {/* Summary */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Professional Summary
              </h3>
              <p className="text-gray-700">
                Results-driven Full Stack Developer with 5+ years of experience
                building scalable web applications. Expertise in React, Node.js,
                and MongoDB. Proven track record of delivering high-quality
                projects on time.
              </p>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Experience
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <p className="font-bold text-gray-900">Senior Developer</p>
                    <p className="text-gray-600">
                      Tech Corp | Jan 2022 - Present
                    </p>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 text-sm mt-2 space-y-1">
                    <li>
                      Led development of microservices architecture serving
                      100K+ users
                    </li>
                    <li>
                      Improved application performance by 40% through
                      optimization
                    </li>
                    <li>Mentored team of 5 junior developers</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Skills</h3>
              <p className="text-gray-700">
                JavaScript, React, Node.js, MongoDB, PostgreSQL, Docker, AWS,
                Git, REST APIs
              </p>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Education
              </h3>
              <div className="flex justify-between">
                <p className="font-bold text-gray-900">
                  Bachelor of Science in Computer Science
                </p>
                <p className="text-gray-600">University Name | 2018</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
