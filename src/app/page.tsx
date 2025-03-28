"use client";

import Link from "next/link";
import { UserPlus, Settings, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const steps = [
    {
      id: 1,
      title: "Create an Account",
      description: "Sign up or sign in to access your personalized meal plans.",
      icon: <UserPlus className="h-6 w-6" />,
      delay: 0,
    },
    {
      id: 2,
      title: "Set Your Preferences",
      description:
        "Input your dietary preferences and goals to tailor your meal plans.",
      icon: <Settings className="h-6 w-6" />,
      delay: 0.1,
    },
    {
      id: 3,
      title: "Receive Your Meal Plan",
      description:
        "Get your customized meal plan delivered weekly to your account.",
      icon: <ClipboardList className="h-6 w-6" />,
      delay: 0.2,
    },
  ];
  return (
    <div>
    <div className="px-4 py-8 sm:py-12 lg:py-16 mx-auto">
      <motion.section
        className="relative text-white rounded-lg mb-12 p-8 text-center h-[400px] flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/mealplan-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-75 rounded-lg"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Personalized AI Meal Plans
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Let our AI do the planning. You focus on cooking and enjoying!
          </p>
          <Link
            href="/sign-up"
            className="inline-block bg-white text-indigo-500 font-medium px-5 py-3 rounded hover:bg-indigo-600 hover:text-white transition-colors"
          >
            Get Started
          </Link>
        </div>
      </motion.section>

      <section className="py-16 px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Follow these simple steps to get your personalized meal plan
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: step.delay }}
            >
              <div className="h-full border border-indigo-300 shadow-lg hover:shadow-lg transition-shadow duration-300 rounded-lg space-y-8">
                <div className="pt-6 flex flex-col items-center text-center p-6">
                  <div className="mb-6 relative">
                    <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center text-sm font-bold text-indigo-500">
                      {step.id}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
    </div>
  );
}
