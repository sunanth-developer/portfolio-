import { motion } from 'framer-motion'
import { asset, visuals } from '@/data/visuals'
import { waveEase } from '@/lib/wave'
import type { ProfileId } from '@/context/AppContext'

export function HomeEnvironment({
  active,
  ready,
  reduced,
}: {
  active: ProfileId | null
  ready: boolean
  reduced: boolean
}) {
  const founder = active === 'founder'
  const developer = active === 'developer'
  const idle = !founder && !developer
  const duration = reduced ? 0 : 0.75

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[var(--home-bg)]" />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_16%_68%,rgb(232_51_10/0.14),transparent_46%)]"
        initial={false}
        animate={{ opacity: ready && idle ? 1 : founder ? 0.2 : 0 }}
        transition={{ duration, ease: waveEase }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_84%_62%,rgb(20_138_92/0.12),transparent_46%)]"
        initial={false}
        animate={{ opacity: ready && idle ? 1 : developer ? 0.22 : 0 }}
        transition={{ duration, ease: waveEase }}
      />

      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        fill="none"
        initial={false}
        animate={{ opacity: ready && idle ? 1 : founder ? 0.16 : 0 }}
        transition={{ duration, ease: waveEase }}
      >
        <defs>
          <clipPath id="home-founder-half">
            <rect x="0" y="0" width="720" height="900" />
          </clipPath>
        </defs>
        <g clipPath="url(#home-founder-half)" strokeLinecap="round">
          <path d="M 48 210 C 170 250, 130 390, 280 450 C 400 500, 330 630, 168 690" stroke="#E8330A" strokeOpacity="0.34" strokeWidth="1.6" />
          <path d="M 24 560 C 150 500, 250 700, 420 640" stroke="#E8330A" strokeOpacity="0.24" strokeWidth="1.2" />
          <path d="M 160 250 C 250 330, 210 410, 110 470" stroke="#E8330A" strokeOpacity="0.2" strokeWidth="1.1" />
          <path d="M 52 96 L 118 96 L 118 162" stroke="#E8330A" strokeOpacity="0.32" strokeWidth="1.4" />
          <path d="M 52 96 L 52 162" stroke="#E8330A" strokeOpacity="0.32" strokeWidth="1.4" />
          <path d="M 36 790 L 96 790" stroke="#E8330A" strokeOpacity="0.26" strokeWidth="1.3" />
          <path d="M 36 790 L 36 850" stroke="#E8330A" strokeOpacity="0.26" strokeWidth="1.3" />
          <circle cx="280" cy="450" r="4" fill="#E8330A" fillOpacity="0.36" />
          <circle cx="168" cy="690" r="3" fill="#E8330A" fillOpacity="0.28" />
          <circle cx="420" cy="640" r="2.6" fill="#E8330A" fillOpacity="0.24" />
        </g>
      </motion.svg>

      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        fill="none"
        initial={false}
        animate={{ opacity: ready && idle ? 1 : developer ? 0.2 : 0 }}
        transition={{ duration, ease: waveEase }}
      >
        <defs>
          <clipPath id="home-developer-half">
            <rect x="720" y="0" width="720" height="900" />
          </clipPath>
        </defs>
        <g clipPath="url(#home-developer-half)" strokeLinejoin="miter" strokeLinecap="square">
          <path d="M 1276 86 L 1396 86 L 1396 206" stroke="#148A5C" strokeOpacity="0.36" strokeWidth="1.5" />
          <path d="M 1072 156 L 1072 318 L 1248 318" stroke="#148A5C" strokeOpacity="0.28" strokeWidth="1.3" />
          <path d="M 1176 780 L 1384 780 L 1384 572" stroke="#148A5C" strokeOpacity="0.28" strokeWidth="1.3" />
          <path d="M 960 430 L 1124 430 L 1124 518 L 1260 518" stroke="#148A5C" strokeOpacity="0.22" strokeWidth="1.2" />
          <path d="M 1332 372 L 1332 470 L 1256 470" stroke="#148A5C" strokeOpacity="0.22" strokeWidth="1.2" />
          <path d="M 1008 640 L 1164 640" stroke="#148A5C" strokeOpacity="0.18" strokeWidth="1.1" />
          <circle cx="1396" cy="86" r="3.2" fill="#148A5C" fillOpacity="0.42" />
          <circle cx="1072" cy="318" r="3.2" fill="#148A5C" fillOpacity="0.34" />
          <circle cx="1384" cy="572" r="3.2" fill="#148A5C" fillOpacity="0.34" />
          <circle cx="1260" cy="518" r="2.8" fill="#148A5C" fillOpacity="0.28" />
          <rect x="1118" y="424" width="12" height="12" stroke="#148A5C" strokeOpacity="0.28" strokeWidth="1.2" />
        </g>
      </motion.svg>

      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: founder ? 1 : 0 }}
        transition={{ duration, ease: waveEase }}
      >
        <img
          src={asset(visuals.gateFounder.src)}
          alt=""
          className="h-full w-full object-cover object-[20%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(255_244_236/0.9)_0%,rgb(255_236_226/0.46)_38%,rgb(255_244_236/0.84)_100%)]" />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-[#080909]"
        initial={false}
        animate={{ opacity: developer ? 1 : 0 }}
        transition={{ duration, ease: waveEase }}
      />
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: developer ? 1 : 0 }}
        transition={{ duration, ease: waveEase }}
      >
        <img
          src={asset(visuals.gateDeveloper.src)}
          alt=""
          className="h-full w-full object-cover object-[80%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(8_9_9/0.86)_0%,rgb(8_9_9/0.4)_40%,rgb(8_9_9/0.84)_100%)]" />
      </motion.div>
    </div>
  )
}
