'use client'

import React, { useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

const skills = [
  "USER-FRIENDLY",
  "MAINTAINABLE",
  "SEO-FRIENDLY",
  "INTUITIVE",
  "RELIABLE",
  "PERFORMANT",
  "ACCESSIBLE",
  "RESPONSIVE",
  "SECURE",
  "INTERACTIVE",
  "SCALABLE",
]

const SkillItem = ({ skill }) => (
  <div className="flex items-center space-x-2 mx-4">
    <span className="text-white text-lg font-md uppercase tracking-wider">{skill}</span>
    <span className="w-1.5 h-1.5 bg-white rounded-full opacity-50" />
  </div>
)

const InfiniteSlider = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start({
        x: ['-100%', '0%'],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 40,
            ease: 'linear',
          },
        },
      })
    } else {
      controls.stop()
    }
  }, [controls, inView])

  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-black py-6 transform -skew-y-3">
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10" />
      <motion.div
        className="flex whitespace-nowrap"
        animate={controls}
      >
        {[...skills, ...skills, ...skills, ...skills].map((skill, idx) => (
          <SkillItem key={idx} skill={skill} />
        ))}
      </motion.div>
    </div>
  )
}

export default InfiniteSlider