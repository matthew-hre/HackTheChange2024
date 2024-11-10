'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, X, ChevronLeft } from 'lucide-react'
import { Button } from 'button'

export default function SlidingEventPage() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <Button 
        onClick={toggleVisibility} 
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50"
        variant="secondary"
      >
        {isVisible ? <ChevronLeft /> : 'View Event'}
      </Button>

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isVisible ? '50%' : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-background shadow-lg overflow-y-auto"
      >
        <div className="p-6 relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 left-4"
            onClick={toggleVisibility}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-4">Tech Conference 2024</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="w-5 h-5 mr-2" />
                <span>September 15-17, 2024</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-5 h-5 mr-2" />
                <span>9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-5 h-5 mr-2" />
                <span>San Francisco Convention Center</span>
              </div>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-2">About the Event</h3>
                <p className="text-muted-foreground">
                  Join us for three days of cutting-edge technology talks, workshops, and networking opportunities. 
                  Learn from industry experts and connect with fellow tech enthusiasts.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-2">What to Expect</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Keynote speeches from tech industry leaders</li>
                  <li>Hands-on workshops on the latest technologies</li>
                  <li>Networking sessions with peers and potential employers</li>
                  <li>Product demonstrations from leading tech companies</li>
                  <li>Career fair with opportunities from top tech firms</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">Who Should Attend</h3>
                <p className="text-muted-foreground">
                  This conference is perfect for software developers, IT professionals, tech entrepreneurs, 
                  and anyone passionate about the future of technology.
                </p>
              </section>
            </div>

            <div className="mt-8">
              <Button className="w-full" size="lg">
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}