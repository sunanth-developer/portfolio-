import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppProvider } from '@/context/AppProvider'
import { Layout } from '@/components/Layout'
import Home from '@/pages/Home'

const FounderHome = lazy(() => import('@/pages/FounderHome'))
const DeveloperHome = lazy(() => import('@/pages/DeveloperHome'))
const About = lazy(() => import('@/pages/About'))
const Work = lazy(() => import('@/pages/Work'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const EngineeringPage = lazy(() => import('@/pages/EngineeringPage'))
const Journey = lazy(() => import('@/pages/Journey'))
const Lab = lazy(() => import('@/pages/Lab'))
const FieldNotes = lazy(() => import('@/pages/FieldNotes'))
const FieldNoteDetail = lazy(() => import('@/pages/FieldNoteDetail'))
const Contact = lazy(() => import('@/pages/Contact'))
const DriverSpot = lazy(() => import('@/pages/DriverSpot'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function Fallback() {
  return <div className="min-h-svh bg-bg" />
}

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

  return (
    <BrowserRouter basename={basename || undefined}>
      <AppProvider>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/driverspot" element={<DriverSpot />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/founder" element={<FounderHome />} />
              <Route path="/developer" element={<DeveloperHome />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<ProjectDetail />} />
              <Route path="/ventures" element={<Work />} />
              <Route path="/engineering" element={<EngineeringPage />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/notes" element={<FieldNotes />} />
              <Route path="/notes/:slug" element={<FieldNoteDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </AppProvider>
    </BrowserRouter>
  )
}
