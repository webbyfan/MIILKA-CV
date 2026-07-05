import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Brain,
  Shield,
  Layout,
  FileText,
  Share2,
  Sparkles,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "AI-Powered Writing",
    description:
      "Let OpenAI improve your bullet points and generate compelling summaries",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Brain,
    title: "Smart ATS Optimization",
    description:
      "Analyze and optimize your resume for Applicant Tracking Systems",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Layout,
    title: "Modern Templates",
    description:
      "Choose from beautiful, ATS-safe templates designed by professionals",
    color: "from-indigo-400 to-purple-600",
  },
  {
    icon: FileText,
    title: "Drag & Drop Builder",
    description: "Easily customize sections and reorder content without coding",
    color: "from-pink-400 to-red-500",
  },
  {
    icon: Shield,
    title: "ATS-Safe Guarantee",
    description: "No tables, icons, or columns - just clean, parseable content",
    color: "from-green-400 to-teal-600",
  },
  {
    icon: BarChart3,
    title: "Real-time Feedback",
    description: "Get instant suggestions to improve your resume score",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share your resume as PDF or get a public portfolio link",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Cover Letter AI",
    description: "Generate personalized cover letters for any job posting",
    color: "from-amber-400 to-yellow-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create a professional resume that gets you
            hired
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(99, 102, 241, 0.1)",
                }}
                className="p-6 rounded-xl border border-gray-200 hover:border-indigo-300 transition group cursor-pointer bg-gradient-to-br from-white to-gray-50"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} p-3 mb-4 group-hover:scale-110 transition transform`}
                >
                  <Icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
